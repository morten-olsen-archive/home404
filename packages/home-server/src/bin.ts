import express from 'express';
import { Server } from 'http';
import { createMiddleware } from '@home/client';
import createStore from './state/create';

const app = express();
const server = new Server(app);

// const { dev, hot } = createMiddleware();
// app.use(dev);
// app.use(hot);
createStore(server);

server.listen(5001);