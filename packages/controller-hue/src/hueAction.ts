import { controllerAction } from '@home/sdk';
interface ActionBase {
  id: string,
  bridge: string,
}

interface LightAction extends ActionBase {
  type: 'lights';
  state: {
    on: boolean;
    bri: number;
  };
}

interface SensorAction extends ActionBase { 
  type: 'sensor'
  state: {}
}

type Action = LightAction | SensorAction;

export {
  Action,
};

export default (controllerName: string, actions: Action[]) => controllerAction(controllerName, actions);