import { createStore, applyMiddleware } from 'redux';
import { middleware, reducer } from '@home/client';
import { TVActions, setTVAction } from '../controllers/TV';

const store = createStore(
  reducer,
  applyMiddleware(middleware()),
);

store.subscribe(() => {
  console.log(store.getState());
});

setTimeout(() => {
  store.dispatch(setTVAction('tvs', TVActions.playing));
}, 7000);

console.log(store.getState());