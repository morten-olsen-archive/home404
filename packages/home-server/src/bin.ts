import express from 'express';
import { Server } from 'http';
import { createMiddleware } from '@home/client';
import createStore from './state/create';

const { dev, hot } = createMiddleware();

const app = express();
const server = new Server(app);

app.use(dev);
app.use(hot);
createStore(server);

server.listen(5001);