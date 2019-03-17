import path from 'path';
import fs from 'fs-extra';
import { MiddlewareAPI } from 'redux';
import { Api, Controller } from '@home/sdk';
import Runner from '../Runner';
import console = require('console');

const jsondiffpatch = require('jsondiffpatch');

export interface Config {
  location?: string;
  module: new (api: Api, config: any) => Controller;
  config: any
}

const createApi = (name: string, store: MiddlewareAPI, storageLocation: string): Api => {
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
      const directory = path.join(storageLocation, 'controller-data', name);
      await fs.mkdirp(directory);
      const file = path.join(directory, 'data.json');
      await fs.writeJSON(file, data);
    }
  };
}

const moduleRunner: Runner<Config> = ({ name, options, config, store, emitter, storageLocation }) => {
  let instance: Controller | undefined = undefined;
  if (options.location) {
    const location = require.resolve(options.location);
    const Module = require(location);
    const api = createApi(name, store, storageLocation);
    instance = new (Module.default || Module)(api, config);
  } else if (options.module) {
    const api = createApi(name, store, storageLocation);
    instance = new options.module(api, config);
  }
  if (!instance) {
    throw Error('no instance provided')
  }
  const datalocation = path.join(storageLocation, 'controller-data', name, 'data.json');
  if (fs.existsSync(datalocation)) {
    const raw = fs.readFileSync(datalocation, 'utf-8');
    instance.setData(JSON.parse(raw));
  } else {
    instance.setData({ ... instance.defaultData })
  }
  let currentState = store.getState();
  emitter.on('STATE_UPDATED', (state) => {
    const diff = jsondiffpatch.diff(currentState, state);
    if (instance) {
      instance.patchState(diff);
    }
  });
  emitter.on('ACTION_DISPATCHED', (owner, action) => {
    if (owner === name) {
      if (instance && instance.onAction) {
        instance.onAction(action);
      }
    }
  });
  instance.state = store.getState();
  instance.setup();
};

export default moduleRunner;