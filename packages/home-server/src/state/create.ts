import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import { Server } from 'http';
import * as socket from './socket';
import * as controller from './controller';

const create = (server: Server) => {
  const reducer = (state: any, action: any) => action;
  const store = createStore(
    reducer,
    applyMiddleware(
      socket.middleware(server),
      controller.middleware({
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
      }),
    ),
  );

  return store;
}

export default create;