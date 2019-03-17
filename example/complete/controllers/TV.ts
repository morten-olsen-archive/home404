import { Controller, controllerAction } from '@home/sdk';

enum TVActions {
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped',
  off = 'off',
}

const setTVAction = (controller: string, state: TVActions) => controllerAction(
  controller,
  state,
);

class TVsController extends Controller {
  defaultData: undefined = undefined;

  async setup() {
    await this.addDevice('tv', {
      ip: '127.0.0.1',
    })
    await this.setDeviceState('tv', TVActions.off);
  }

  onAction(action: TVActions) {
    this.setDeviceState('tv', action);
  }
}

export {
  setTVAction,
  TVActions,
}

export default TVsController;