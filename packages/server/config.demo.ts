import { Configuration } from './src';

const config: Configuration = {
  controllers: [{
    type: 'module',
    name: 'demo',
    options: {
      location: '@home/controller-demo',
    },
    config: {
      hello: 'world',
    }
  }],
  includeClient: 'dev',
};

export default config;