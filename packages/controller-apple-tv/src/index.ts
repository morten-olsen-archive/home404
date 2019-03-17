import { scan, parseCredentials, NowPlayingInfo, AppleTV } from 'node-appletv';
import { Controller, controllerAction } from '@home/sdk';

interface DataType {
  logins: {[name: string]: any}
};

const pinAction = (controllerName: string, deviceId: string, pincode: string) => controllerAction(
  controllerName, {
    pincode,
    deviceId,
  },
);

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
    await this.api.addDevice(id, {
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
    await this.api.setDeviceInfo(id, {
      connected: true,
      paired: true,
    });
    device.on('nowPlaying', (info) => this.onNowPlaying(device, info));
  }
  
  onNowPlaying = (device: AppleTV, playing: NowPlayingInfo) => {
    this.api.setDeviceState(device.uid, playing);
  }

  async onAction(action: any) {
    if (action.pincode && this.loginRequests[action.deviceId]) {
      const device = await this.loginRequests[action.deviceId](action.pincode)
      this.data.logins[device.uid] = device.credentials.toString();
      await this.save();
      await this.connectDevice(device);
    }
  }
}

export {
  pinAction,
};

export default AppleTVController;