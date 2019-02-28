import { Controller } from '@home/sdk';

class Demo extends Controller {
  async setup() {
    console.log('config', this.config);
  }
}

export default Demo;