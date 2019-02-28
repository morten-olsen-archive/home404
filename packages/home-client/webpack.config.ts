import path from 'path';
import { Configuration } from 'webpack';
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
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.tsx?$/,
      include: [
        path.join(__dirname, 'src'),
      ],
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      }
    }],
  },
  plugins: [
    new HtmlPlugin(),
  ],
};

export default configuration;
