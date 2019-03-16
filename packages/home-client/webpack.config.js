"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const configuration = {
    entry: [
        path_1.default.join(__dirname, 'src/index.tsx'),
    ],
    mode: 'development',
    context: path_1.default.join(__dirname, '../../..'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        /*modules: [
          path.join(__dirname, '../../../node_modules'),
        ],*/
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                include: [
                    path_1.default.join(__dirname, 'src'),
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
        new html_webpack_plugin_1.default(),
        new webpack_1.default.HotModuleReplacementPlugin(),
    ],
};
exports.default = configuration;
