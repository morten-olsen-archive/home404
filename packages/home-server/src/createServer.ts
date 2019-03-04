import express from 'express';
import { Server } from 'http';
import { createMiddleware } from '@home/client';
import { Configuration } from '.';
import createStore from './state/create';

const create = (config: Configuration) => {
  const app = express();
  const server = new Server(app);

  if (config.includeClient === 'dev') {
    const { dev, hot } = createMiddleware();
    app.use(dev);
    app.use(hot);
  }
  createStore(server, config);

  return app;
};

export default create;