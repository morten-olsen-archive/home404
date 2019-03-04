import path from 'path';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Server } from 'http';
import { Configuration } from '..';
import * as devices from './devices';
import * as socket from './socket';
import * as controller from './controller';
import extenders from './extenders';

const create = (server: Server, config: Configuration) => {
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