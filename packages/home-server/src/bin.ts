import tsnode from 'ts-node';
tsnode.register({
  compilerOptions: {
    tranpileOnly: true,
  },
});
import path from 'path';
import commander from 'commander';
import createServer from './createServer';
import logger from './logger';

const action = (fn: (...args: any[]) => Promise<void>) => (...args: any[]) => {
  fn(...args).catch(err => console.error(err));
}

const start = commander.command('start');
start.option('-c --config <location>', 'location of config file', path.join(process.cwd(), 'config.js'));
start.option('-p --port <port>', 'port to listen on', parseInt, 5003);
start.action(action(async ({ config, port }) => {
  const configLocation = path.resolve(config);
  const configuration = require(configLocation);
  const server = createServer(configuration.default || configuration);
  server.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
}));

commander.parse(process.argv);
