// @flow
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = require('./src/config/src-config');
const clone = require('clone');
const webpackDevConfig = require('./webpack.config.js');

const productionConfig = clone(webpackDevConfig);

productionConfig.entry = config.ENTRIES;

productionConfig.output = {
  path: config.OUTPUT.PATH,
  filename: config.OUTPUT.FILENAME,
  publicPath: config.PUBLIC_PATH,
  sourceMapFilename: '[name].map'
};

productionConfig.devtool = 'cheap-module-source-map';

productionConfig.plugins = [
  new ExtractTextPlugin({
    filename: '[name].css'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new UglifyJSPlugin({
    sourceMap: productionConfig.devtool &&
      (productionConfig.devtool.indexOf('sourcemap') >= 0 ||
      productionConfig.devtool.indexOf('source-map') >= 0),
    comments: false
  }),
  // Implicit Common Vendor Chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module) {
      // This assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$|\.css$/,
    threshold: 10240, // bytes
    minRatio: 0.8
  })
];

productionConfig.module.rules = [
  {
    test: /.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      babelrc: false,
      plugins: [
        'transform-object-rest-spread',
        'transform-runtime',
        'syntax-dynamic-import',
        'transform-async-to-generator',
        'transform-regenerator',
        'transform-runtime'
      ],
      presets: [
        [ 'es2015', { 'modules': false } ],
        'react'
      ]
    }
  },
  {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            localIdentName: config.LOCAL_INDENT_NAME
          }
        },
        'postcss-loader',
        'stylus-loader',
        {
          loader: 'prepend-style-loader',
          options: {
            prepend: config.PREPEND_STYLES
          }
        }
      ]
    })
  },
  {
    test: /\.css/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  {
    test: /.(png|jpg|ttf|eot|woff|otf)$/,
    use: [
      {
        loader: 'url-loader'
      }
    ]
  }
];

productionConfig.stats = {
  chunks: false,
  colors: true,
  children: false
};


module.exports = productionConfig;
