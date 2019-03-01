import runners from './runners';
import { Middleware } from 'redux';
import { EventEmitter } from 'events';

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
  const emitter = new EventEmitter();
  setTimeout(() => {
    options.controllers.forEach((controller) => {
      const runner = runners[controller.type];
      runner({
        name: controller.name,
        options: controller.options,
        config: controller.config,
        store: store,
        emitter,
      });
    });
  }, 10);
  return (action) => {
    const result = next(action);
    Promise.resolve(result).then(() => {
      emitter.emit('STATE_UPDATED', store.getState());
    });
    return result;
  };
};

export default controllerMiddleware;