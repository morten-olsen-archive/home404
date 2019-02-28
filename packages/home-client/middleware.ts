import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import configuration from './webpack.config';

const create = () => {
  const bundler = webpack(configuration);
  const middleware = webpackDevMiddleware(bundler, {
    // logLevel: 'error',
    publicPath: '/',
  });
  return middleware;
};

export default create;
