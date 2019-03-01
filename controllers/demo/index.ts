import { Controller } from '@home/sdk';

class Demo extends Controller {
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

    updateState();
  }
}

export default Demo;