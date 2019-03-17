import { Reducer, Automation, Controller as ControllerType, Api } from '@home/sdk';

interface BaseController {
  name: string;
  type: string;
  config?: any;
  options: any;
}

interface ModuleController extends BaseController {
  type: 'module';
  options: {
    location?: string;
    module?: new (api: Api, config: any) => ControllerType;
  }
}

type Controller = ModuleController;

interface Configuration {
  controllers?: Controller[],
  reducers?: {[name: string]: Reducer},
  automations?: Automation[],
  dataLocation?: string,
};

export {
  ModuleController,
  Controller,
  Reducer,
};

export default Configuration;