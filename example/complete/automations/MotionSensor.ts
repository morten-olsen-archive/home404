import { Automation } from '@home/sdk';
import { Rooms } from '../reducers/rooms';
import { TVActions } from '../controllers/TV';

class MotionSensor extends Automation {
  constructor() {
    super();
    Object.keys(Rooms).forEach((room) => {
      this.addWatcher<boolean>(
        ['rooms', room, 'motion', 'state', 'presence'],
        this.onPresenceChanged.bind(this, room),
      );

      this.addWatcher<TVActions>(
        ['rooms', Rooms.livingroom, 'tv'],
        this.onTvChanged.bind(this),
      );
    });
  }

  onPresenceChanged(room: string, presence: boolean) {

  }

  onTvChanged(action: TVActions) {

  }

  tunLightOn() {
    const currentLight = this.getValue(['rooms', Rooms.livingroom, 'lights', 0, 'state', 'on']);
    console.log('current', currentLight);
  }

  turnLightOff() {

  }
}

export default MotionSensor;