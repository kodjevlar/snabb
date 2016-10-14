const clone = require('clone');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcConfig = require('./src/config');
const baseConfig = require('./webpack.config.js');

const productionConfig = clone(baseConfig);

productionConfig.entry = [
  srcConfig.ENTRY.PRODUCTION
];

productionConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin(srcConfig.FILES.STYLE_BUNDLE),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

productionConfig.module.loaders = [
  {
    test: /.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      plugins: ['transform-runtime'],
      presets: ['es2015', 'react']
    }
  },
  {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract('css-loader?modules&camelCase&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader') // eslint-disable-line
  }
];

module.exports = productionConfig;
