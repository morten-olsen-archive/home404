import axios from 'axios';
import { Controller } from '@home/sdk';
import console = require('console');

interface BridgeDto {
  id: string;
  internalipaddress: string;
}

interface DataType {
  bridges: {[name: string]: {
    username: string | undefined;
  }};
};

class HueController extends Controller<any, DataType> {
  private stateCache: {[id: string]: any} = {}

  defaultData = {
    bridges: {},
  };

  setup = async () => {
    const { data: bridges} = await axios.get('https://discovery.meethue.com/');
    if (bridges.length === 0) return;
    await Promise.all(bridges.map(this.addBridge));
  }

  waitForSetup = (internalipaddress: string): Promise<{ username: string }> => new Promise(async (resolve) => {
    const { data: apiClient } = await axios.post(`http://${internalipaddress}/api`, {
      devicetype: 'home api client',
    });
    if (apiClient[0].error) {
      setTimeout(async () => {
        resolve(await this.waitForSetup(internalipaddress));
      }, 3000);
    } else {
      const username = apiClient[0].success.username;

      resolve({
        username,
      });
    }
  })

  addBridge = async ({ id, internalipaddress }: BridgeDto) => {
    const uid = `bridge-${id}`;
   
    if (!this.data.bridges[uid]) {
      this.data.bridges[uid] = {
        username: undefined,
      }
    }

    const settings = this.data.bridges[uid];
    await this.api.addDevice(uid, {
      ip: internalipaddress,
    });
    await this.api.setDeviceState(uid, {
      connected: 'preparing',
    });

    if (!settings.username) {
      await this.api.setDeviceState(uid, {
        connected: 'waitingForButtonPress',
      });
      const client = await this.waitForSetup(internalipaddress);
      settings.username = client.username;
      await this.save();
    }
    await this.api.setDeviceState(uid, {
      connected: 'connected',
    });
    await this.addDevices(internalipaddress, settings.username);
    await this.updateDevices(internalipaddress, settings.username);
  }

  cachedSetState = async (id: string, state: any) => {
    if (this.stateCache[id] !== state) {
      await this.api.setDeviceState(id, state);
      this.stateCache[id] = state;
    }
  }

  addDevices = async (ip: string, username: string) => {
    const { data: lights} = await axios.get(`http://${ip}/api/${username}/lights`);
    await Promise.all(Object.keys(lights).map(async (id) => {
      await this.api.addDevice(`light-${id}`, {
        name: lights[id].name,
        productname: lights[id].productname,
        type: 'light',
        internalId: id,
      })
    }));

    const { data: sensors} = await axios.get(`http://${ip}/api/${username}/sensors`);
    await Promise.all(Object.keys(sensors).map(async (id) => {
      await this.api.addDevice(`sensor-${id}`, {
        name: sensors[id].name,
        productname: sensors[id].productname,
        type: 'sensor',
        internalId: id,
      })
    }));
  }

  updateDevices = async (ip: string, username: string) => {
    const { data: lights} = await axios.get(`http://${ip}/api/${username}/lights`);
    await Promise.all(Object.keys(lights).map(async (id) => {
      await this.cachedSetState(`light-${id}`, lights[id].state);
    }));

    const { data: sensors} = await axios.get(`http://${ip}/api/${username}/sensors`);
    await Promise.all(Object.keys(sensors).map(async (id) => {
      await this.cachedSetState(`sensor-${id}`, sensors[id].state);
    }));
  }
}

export default HueController;