import runners, { Runner } from './runners';
import path from 'path';
import { Middleware } from 'redux';
import { EventEmitter } from 'events';
import { Configuration } from '../..';
import console = require('console');

const controllerMiddleware = ({
  controllers,
  dataLocation = path.join(process.cwd(), './configs'),
}: Configuration): Middleware => (store) => (next) => {
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
          storageLocation: dataLocation,
          emitter,
        });
      });
    }
  }, 10);
  return (action) => {
    const result = next(action);
    if (action.type === '@@DEVICE/ACTION') {
      emitter.emit('ACTION_DISPATCHED', action.meta.owner, action.payload);
    } else {
      Promise.resolve(result).then(() => {
        emitter.emit('STATE_UPDATED', store.getState());
      });
    }
    return result;
  };
};

export default controllerMiddleware;