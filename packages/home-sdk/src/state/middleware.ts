import { Middleware } from 'redux';
import createSocket from 'socket.io-client';

const socketMiddleware: Middleware = (store) => (next) => {
  const socket = createSocket();
  socket.on('UPDATE_STORE', (state: any) => {
    console.log('UPDATE', state);
    next({
      type: '@@SERVER/UPDATE_STATE',
      payload: state,
    });
  })
  
  socket.on('PATCH_STORE', (patch: any) => {
    console.log('PATCH', patch);
    next({
      type: '@@SERVER/PATCH_STATE',
      payload: patch,
    });
  })

  return (action) => {
    if (action.server) {
      socket.emit('DISPATCH', action);
    } else {
      return next(action);
    }
  }
};

export default socketMiddleware;