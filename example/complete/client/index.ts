import config from './webpack.config';
import webpack from 'webpack';
import createMiddleware from 'webpack-dev-middleware';

const bundler = webpack(config);
const middleware = createMiddleware(bundler);

export default middleware;