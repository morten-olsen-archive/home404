import { createServer } from '@home/server';
import * as reducers from './reducers';
import LightsController from './controllers/Lights';
import TVController from './controllers/TV';
import MotionSensorController from './controllers/MotionSensors';

const start = async () => {
  const { server, app, store } = createServer({
    controllers: [{
      type: 'module',
      name: 'lights',
      options: {
        module: LightsController,
      },
    }, {
      type: 'module',
      name: 'tvs',
      options: {
        module: TVController,
      },
    }, {
      type: 'module',
      name: 'motionsensors',
      options: {
        module: MotionSensorController,
      },
    }],
    reducers,
  });

  app.get('/', (req, res) => {
    res.json(store.getState().extended);
  });

  server.listen(5006);
}

start().catch(err => console.error(err));