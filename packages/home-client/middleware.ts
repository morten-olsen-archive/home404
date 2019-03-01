import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import configuration from './webpack.config';

export const createMiddleware = () => {
  const bundler = webpack(configuration);
  const dev = webpackDevMiddleware(bundler, {
    // logLevel: 'error',
    publicPath: '/',
  });
  const hot = webpackHotMiddleware(bundler);
  return {
    dev,
    hot,
  };
};
