import express from 'express';
import { Server } from 'http';
import { Configuration } from '.';
import createStore from './state/create';

const create = (config: Configuration) => {
  const app = express();
  const server = new Server(app);
  const store = createStore(server, config);

  return {
    server,
    app,
    store,
  };
};

export default create;