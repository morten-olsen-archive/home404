import { Reducer, Automation } from '@home/sdk';

interface BaseController {
  name: string;
  type: string;
  config: any;
  options: any;
}

interface ModuleController extends BaseController {
  type: 'module';
  options: {
    location: string;
  }

}

type Controller = ModuleController;

interface Configuration {
  controllers?: Controller[],
  reducers?: {[name: string]: Reducer},
  automations?: Automation[],
  dataLocation?: string,
  includeClient?: 'dev',
};

export {
  ModuleController,
  Controller,
  Reducer,
};

export default Configuration;