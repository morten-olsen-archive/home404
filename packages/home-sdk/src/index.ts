import Controller from './Controller';
import Api from './Api';
import Device from './Device';
import middleware from './state/middleware';
import reducer from './state/reducer';
import State, { Data } from './State';

type Reducer = ((state: Data, action?: any) => any) | string;

export {
  Controller,
  Api,
  Device,
  middleware,
  reducer,
  Reducer,
  State,
  Data,
};
