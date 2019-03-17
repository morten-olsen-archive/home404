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
}

export default MotionSensor;