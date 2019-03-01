import path from 'path';
import { MiddlewareAPI } from 'redux';
import { Api } from '@home/sdk';
import Runner from './Runner';

export interface Config {
  location: string;
  config: any
}

const createApi = (name: string, store: MiddlewareAPI): Api => {
  const dispatch = (type: string, id: string, payload? : any) => {
    store.dispatch({
      type,
      payload,
      meta: {
        owner: name,
        id,
      },
    });
  }
  return {
    addDevice: async (id, info) => dispatch('@@DEVICES/ADD', id, info),
    setDeviceInfo: async (id, info) => dispatch('@@DEVICES/UPDATE_INFO', id, info),
    setDeviceState: async (id, state) => dispatch('@@DEVICES/UPDATE_STATE', id, state),
    removeDevice: async (id) => dispatch('@@DEVICES/REMOVE', id,),
  };
}

const moduleRunner: Runner<Config> = (name, options, config, store) => {
  const location = path.resolve(options.location);
  const Module = require(location);
  const api = createApi(name, store);
  const instance = new (Module.default || Module)(api, config);
  instance.setup();
};

export default moduleRunner;