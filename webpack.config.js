const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');

var config = {
  module: {},
  resolve: {
    alias: {
      routes: path.join(__dirname, 'src', 'routes'),
      components: path.join(__dirname, 'src', 'components')
    }
  },
  modulesDirectories: ['node_modules', 'src']
};

config.entry = [
  './src/main'
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
  },
  {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract('css-loader?modules&camelCase&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader') // eslint-disable-line
  }
];

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('[name].css')
];

config.postcss = () => {
  return [autoprefixer];
};

config.stylus = {
  use: [
    poststylus(['autoprefixer'])
  ]
};

module.exports = config;
