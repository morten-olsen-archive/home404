import path from 'path';
import { MiddlewareAPI } from 'redux';
import { Api } from '@home/sdk';
import Runner from './Runner';

export interface Config {
  location: string;
  config: any
}

const createApi = (name: string, store: MiddlewareAPI): Api => {
  return {

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