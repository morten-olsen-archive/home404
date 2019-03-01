import path from 'path';
import fs from 'fs-extra';
import { MiddlewareAPI } from 'redux';
import { Api, Controller } from '@home/sdk';
import Runner from './Runner';
import config from '../../../config';

const jsondiffpatch = require('jsondiffpatch');

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
    saveData: async (data) => {
      const directory = path.join(config.storageLocation, 'controller-data', name);
      await fs.mkdirp(directory);
      const file = path.join(directory, 'data.json');
      await fs.writeJSON(file, data);
    }
  };
}

const moduleRunner: Runner<Config> = ({ name, options, config, store, emitter }) => {
  const location = path.resolve(options.location);
  const Module = require(location);
  const api = createApi(name, store);
  const instance: Controller = new (Module.default || Module)(api, config);
  let currentState = store.getState();
  emitter.on('STATE_UPDATED', (state) => {
    const diff = jsondiffpatch.diff(currentState, state);
    instance.patchState(diff);
  });
  instance.state = store.getState();
  instance.setup();
};

export default moduleRunner;