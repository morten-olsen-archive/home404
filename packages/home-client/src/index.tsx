import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import createStore from './state/create';

const root = document.createElement('div');
document.body.appendChild(root);

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <DevTools />
  </Provider>,
  root,
);
