import runners from './runners';
import { Middleware } from 'redux';

export interface ControllerType {
  type: string;
  name: string;
  config: any;
  options: any;
}

export interface Options {
  controllers: ControllerType[];
}

const controllerMiddleware = (options: Options): Middleware => (store) => (next) => {
  setTimeout(() => {
    options.controllers.forEach((controller) => {
      const runner = runners[controller.type];
      runner(controller.name, controller.options, controller.config, store);
    });
  }, 10);
  return (action) => {
    return next(action);
  };
};

export default controllerMiddleware;