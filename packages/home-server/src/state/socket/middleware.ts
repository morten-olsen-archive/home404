import createSocket from 'socket.io';
import { Server } from 'http';
import { Middleware } from 'redux';

const jsondiffpatch = require('jsondiffpatch');

const socketMiddleware = (server: Server): Middleware => (store) => {
  const socket = createSocket(server);
  socket.on('connection', (client) => {
    client.emit('UPDATE_STORE', store.getState());

    client.on('DISPATCH', (action) => {
      store.dispatch(action);
    });
  });

  return (next) => (action) => {
    const before = store.getState();
    socket.emit('ACTION', action);
    const result = next(action);
    Promise.resolve(result).then(() => {
      const after = store.getState();
      const diff = jsondiffpatch.diff(before, after)
      socket.emit('PATCH_STORE', diff);
    });
    return result;
  };
};

export default socketMiddleware;