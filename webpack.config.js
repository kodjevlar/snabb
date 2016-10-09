const path = require('path');
const webpack = require('webpack');

var config = {
  module: {}
};

config.entry = [
  './client'
];

config.output = {
  path: path.join(__dirname, 'public'),
  filename: 'bundle.js',
  chunkFilename: '[id].js',
  publicPath: 'static'
};

config.module.loaders = [
  {
    test: /.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  }
];

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

module.exports = config;
