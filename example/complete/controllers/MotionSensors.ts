import { Controller, controllerAction } from '@home/sdk';

const setMotionSensorAction = (controller: string, id: string, presence: boolean) => controllerAction(
  controller,
  {
    id,
    presence,
  },
);

class MotionSensorController extends Controller {
  defaultData: undefined = undefined;

  async setup() {
    for (let i = 0; i < 3; i += 1) {
      await this.addDevice(i.toString(), {});
      await this.setDeviceState(i.toString(), false);
    }
  }

  onAction({ id, presence }: { id: string, presence: boolean }) {
    this.setDeviceState(id.toString(), presence);
  }
}

export {
  setMotionSensorAction as setLightAction,
}

export default MotionSensorController;