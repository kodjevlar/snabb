const clone = require('clone');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcConfig = require('./src/config');
const baseConfig = require('./webpack.config.js');

const productionConfig = clone(baseConfig);

productionConfig.entry = [
  srcConfig.entry.production
];

productionConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin(srcConfig.files.STYLE_BUNDLE)
];

module.exports = productionConfig;
