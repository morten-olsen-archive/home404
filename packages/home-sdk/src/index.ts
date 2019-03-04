import Controller from './Controller';
import Api from './Api';
import Device from './Device';
import middleware from './state/middleware';
import reducer from './state/reducer';

type Reducer<StateType = any> = ((state: StateType) => any) | string;

export {
  Controller,
  Api,
  Device,
  middleware,
  reducer,
  Reducer,
};
