import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Server } from 'http';
import { State } from '@home/sdk';
import { composeWithDevTools } from 'remote-redux-devtools'
import { Configuration } from '..';
import * as devices from './devices';
import * as socket from './socket';
import * as controller from './controller';
import * as automations from './automations';
import extenders from './extenders';

const composeEnhancers = compose; /*composeWithDevTools({
  realtime: true,
  name: 'Your Instance Name',
  hostname: 'localhost',
  port: 8000 // the port your remotedev server is running at
})*/

const create = <ExtenderType = {[name: string]: any}>(server: Server | undefined, config: Configuration) => {
  const reducer = combineReducers({
    devices: devices.reducer,
  });
  const store = createStore<State<ExtenderType>, any, {}, {}>(
    extenders(reducer, config.reducers || {}),
    composeEnhancers(
      applyMiddleware(
        automations.middleware(config.automations || []),
        controller.middleware({
          controllers: config.controllers,
        }),
        ...(server ? [
          socket.middleware(server),
        ] : []),
      ),
    ),
  );

  return store;
}

export default create;
