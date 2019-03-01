import { hot } from 'react-hot-loader'
import React from 'react';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import createStore from './state/create';
import House from './components/House';

const store = createStore();

const rooms = [{
  name: 'Bedroom',
  paths: [
    [.1, 0],
    [.55, 0],
    [.55, .35],
    [.1, .35],
  ]
}, {
  name: 'Walkin',
  paths: [
    [.1, .35],
    [.55, .35],
    [.55, .6],
    [.1, .6],
  ]
}, {
  name: 'Living Room',
  paths: [
    [.55, 0],
    [1, 0],
    [1, .6],
    [.55, .6],
  ]
}, {
  name: 'Hallway',
  paths: [
    [0, .6],
    [.35, .6],
    [.35, .7],
    [0, .7],
  ]
}, {
  name: 'Bathroom',
  paths: [
    [0, .7],
    [.35, .7],
    [.35, 1],
    [0, 1],
  ]
}, {
  name: 'Kitchen',
  paths: [
    [.35, .6],
    [1, .6],
    [1, 1],
    [.35, 1],
  ]
}];

const App = () => (
  <Provider store={store}>
    <>
      <House width={500} height={400} rooms={rooms} />
      <DevTools />
    </>
  </Provider>
);

export default hot(module)(App);
