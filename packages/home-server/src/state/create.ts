import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Server } from 'http';
import { State } from '@home/sdk';
import { Configuration } from '..';
import * as devices from './devices';
import * as socket from './socket';
import * as controller from './controller';
import extenders from './extenders';

const create = <ExtenderType = {[name: string]: any}>(server: Server | undefined, config: Configuration) => {
  const reducer = combineReducers({
    devices: devices.reducer,
  });
  const store = createStore<State<ExtenderType>, any, {}, {}>(
    extenders(reducer, config.reducers || {}),
    applyMiddleware(
      ...(server ? [
        socket.middleware(server),
      ] : []),
      controller.middleware({
        controllers: config.controllers,
      }),
    ),
  );

  return store;
}

export default create;