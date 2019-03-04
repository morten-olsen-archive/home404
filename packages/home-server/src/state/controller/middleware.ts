import runners from './runners';
import { Middleware } from 'redux';
import { EventEmitter } from 'events';
import { Configuration } from '../..';

const controllerMiddleware = ({ controllers }: Configuration): Middleware => (store) => (next) => {
  const emitter = new EventEmitter();
  setTimeout(() => {
    if (controllers) {
      controllers.forEach((controller) => {
        const runner = runners[controller.type];
        runner({
          name: controller.name,
          options: controller.options,
          config: controller.config,
          store: store,
          emitter,
        });
      });
    }
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