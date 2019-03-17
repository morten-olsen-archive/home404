import { Middleware } from 'redux';
import socketio from 'socket.io-client';

interface Options {
  host?: string;
}

const middleware = (options: Options): Middleware => (store) => (next) => {
  const socket = socketio({
    host: options.host,
  });

  socket.on('UPDATE_STORE', (state: any) => {
    next({
      type: '@@SOCKET/UPDATE_STORE',
      payload: state,
    });
  });

  socket.on('PATCH_STORE', (state: any) => {
    next({
      type: '@@SOCKET/PATCH_STORE',
      payload: state,
    });
  });

  return (action) => {
    if (action.type === '@@DEVICE/ACTION') {
      socket.emit('DISPATCH', action);
    } else {
      return next(action);
    }
  };
};

export default middleware;