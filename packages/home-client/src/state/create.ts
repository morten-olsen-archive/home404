import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import DevTools from '../containers/DevTools';
import * as socket from './socket';

const enhancer = compose(
  applyMiddleware(
    socket.middleware,
  ),
  DevTools.instrument()
);

const create = () => {
  const reducer = combineReducers({
    server: socket.reducer,
  });
  const store = createStore(
    reducer,
    undefined,
    enhancer as any,
  );

 return store;
}

export default create;