import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

const configuration: Configuration = {
  entry: [
    path.join(__dirname, 'src/index.tsx'),
  ],
  mode: 'development',
  context: __dirname,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [
      path.join(__dirname, '../../node_modules'),
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: [
        path.join(__dirname, 'src'),
      ],
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: ['react-hot-loader/babel'],
      },
    }],
  },
  plugins: [
    new HtmlPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default configuration;
