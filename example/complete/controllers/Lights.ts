import { Controller, controllerAction } from '@home/sdk';

interface SetLightAction {
  lights: number[];
  state: {
    on?: boolean;
  };
}

interface Light {
  on: boolean;
}

const setLightAction = (controller: string, action: SetLightAction) => controllerAction(
  controller,
  action,
);

class LightsController extends Controller {
  defaultData: undefined = undefined;
  lights: Light[] = [];

  async setup() {
    await this.addDevice('controller', {
      ip: '127.0.0.1',
      type: 'controller',
    })
    await this.setDeviceState('controller', {
      connected: false,
    });
    await this.setDeviceState('controller', {
      connected: true,
    });

    for (let i = 0; i < 3; i += 1) {
      this.lights[i] = {
        on: false,
      };
      await this.addDevice(`light-${i}`, {
        type: 'light',
        id: i,
      });
    }

    await Promise.all(this.lights.map((light, i) => this.setDeviceState(`light-${i}`, light)));
  }

  onAction(action: SetLightAction) {
    action.lights.forEach((id) => {
      this.lights[id] = {
        ...this.lights[id],
        ...action.state,
      };
      this.setDeviceState(`lights-${id}`, this.lights[id]);
    });
  }
}

export {
  setLightAction,
}

export default LightsController;