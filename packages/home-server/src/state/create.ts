import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Server } from 'http';
import { State } from '@home/sdk';
import { composeWithDevTools } from 'remote-redux-devtools'
import { Configuration } from '..';
import * as devices from './devices';
import * as socket from './socket';
import * as controller from './controller';
import extenders from './extenders';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  hostname: 'localhost',
  port: 8000 // the port your remotedev server is running at
})

const create = <ExtenderType = {[name: string]: any}>(server: Server | undefined, config: Configuration) => {
  const reducer = combineReducers({
    devices: devices.reducer,
  });
  const store = createStore<State<ExtenderType>, any, {}, {}>(
    extenders(reducer, config.reducers || {}),
    composeEnhancers(
      applyMiddleware(
        ...(server ? [
          socket.middleware(server),
        ] : []),
        controller.middleware({
          controllers: config.controllers,
        }),
      ),
    ),
  );

  return store;
}

export default create;
