import path from 'path';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Server } from 'http';
import * as devices from './devices';
import * as socket from './socket';
import * as controller from './controller';
import extenders from './extenders';

const config = {
  controllers: [{
    type: 'module',
    name: 'demo',
    options: {
      location: path.join(__dirname, '../../../../controllers/demo'),
    },
    config: {
      hello: 'world',
    }
  }],
};

const create = (server: Server) => {
  const reducer = combineReducers({
    devices: devices.reducer,
  });
  const store = createStore(
    extenders(reducer),
    applyMiddleware(
      socket.middleware(server),
      controller.middleware({
        controllers: config.controllers,
      }),
    ),
  );

  return store;
}

export default create;