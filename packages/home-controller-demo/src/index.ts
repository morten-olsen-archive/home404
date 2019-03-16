import { Controller } from '@home/sdk';
import console = require('console');

class Demo extends Controller {
  defaultData: any;
  async setup() {
    console.log('config', this.config);

    this.api.addDevice('foo', {
      bar: 'baz',
    });

    const updateState = () => {
      this.api.setDeviceState('foo', {
        value: Math.random(),
      });
      setTimeout(updateState, 2000);
    };

    this.data = {
      hello: Math.random(),
    };

    await this.save();

    updateState();
  }

  stateDidChange() {
    console.log('state', this.state);
  }
}

export default Demo;