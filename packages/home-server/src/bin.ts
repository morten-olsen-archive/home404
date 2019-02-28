import express from 'express';
import { Server } from 'http';
import middleware from '@home/client';
import createStore from './state/create';

const app = express();
const server = new Server(app);

app.use('/', middleware());
createStore(server);

server.listen(5001);