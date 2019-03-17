import { Reducer } from '@home/sdk';
import { TVActions } from '../controllers/TV';

enum Rooms {
  livingroom = 'livingroom',
  kitchen = 'kitchen',
  bedroom = 'bedroom',
};

interface Room {
  light: any,
  motion: any,
  tv?: TVActions,
}

const rooms: Reducer = (state) => {
  const result: {[room: string]: Room} = {};
  const allMotionSensors = state.devices.filter(device => device.owner === 'motionsensors');
  const allLights = state.devices.filter(device => device.owner === 'lights' && device.info.type === 'light');
  Object.keys(Rooms).forEach((name, i) => {
    const light = allLights[i];
    const motion = allMotionSensors[i];
    result[name] = {
      light,
      motion,
    }
  });

  const tv = state.devices.find(device => device.owner === 'tvs');
  if (tv) {
    result[Rooms.livingroom].tv = tv.state;
  }
  return result;
};

export {
  Rooms,
}

export default rooms;