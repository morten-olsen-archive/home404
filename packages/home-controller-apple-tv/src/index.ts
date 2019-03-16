import { scan, parseCredentials, NowPlayingInfo, AppleTV } from 'node-appletv';
import { Controller } from '@home/sdk';
import console = require('console');

interface BridgeDto {
  id: string;
  internalipaddress: string;
}

interface DataType {
  logins: {[name: string]: any}
};

class AppleTVController extends Controller<any, DataType> {
  defaultData: DataType = {
    logins: {},
  };

  private devices: {[name: string]: AppleTV} = {};
  private loginRequests: {[name: string]: (pin: string) => Promise<AppleTV>} = {};

  setup = async () => {
    const devices = await scan();
    devices.forEach((device) => {
      this.devices[device.uid] = device;
    });
    await Promise.all(Object.keys(this.devices).map(name => this.setupTV(this.devices[name])));
  }

  setupTV = async (device: AppleTV) => {
    const id = device.uid;
    const login = this.data.logins[id];
    this.api.addDevice(id, {
      connected: false,
      paired: !!login,
    });
    if (login) {
      await this.connectDevice(device);
    } else {
      await this.pairDevice(device);
    }
  }

  async pairDevice(device: AppleTV) {
    await device.openConnection();
    const callback = await device.pair();
    this.loginRequests[device.uid] = callback;
  }

  async connectDevice(device: AppleTV) {
    const id = device.uid;
    const login = this.data.logins[id];
    await device.openConnection(parseCredentials(login));
    device.on('nowPlaying', (info) => this.onNowPlaying(device, info));
  }
  
  onNowPlaying = (device: AppleTV, playing: NowPlayingInfo) => {
    this.api.setDeviceState(device.uid, playing);
  }

  async onAction(action: any) {
    if (action.pincode && this.loginRequests[action.device]) {
      const device = await this.loginRequests[action.device](action.pincode)
      this.data.logins[device.uid] = device.credentials.toString();
      await this.save();
      await this.connectDevice(device);
    }
  }
}

export default AppleTVController;