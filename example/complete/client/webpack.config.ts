import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  entry: path.join(__dirname, 'client.ts'),
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.join(__dirname, '../../../node_modules'),
    ]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    }]
  }
}

export default config;