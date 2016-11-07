const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const srcConfig = require('./src/config');

var config = {
  module: {},
  resolve: {
    alias: {
      routes: path.join(__dirname, 'src', 'routes'),
      components: path.join(__dirname, 'src', 'components'),
      server: path.join(__dirname, 'src', 'server'),
      utils: path.join(__dirname, 'src', 'utils'),
      resources: path.join(__dirname, 'src', 'resources'),
      server: path.join(__dirname, 'src', 'server'),
      ducks: path.join(__dirname, 'src', 'redux', 'ducks'),
      store: path.join(__dirname, 'src', 'redux', 'store')
    }
  },
  extensions: ['', '.js', '.jsx', '.json'],
  modulesDirectories: ['node_modules', 'src']
};

config.entry = [
  srcConfig.ENTRY.DEVELOPMENT,
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
];

config.output = {
  path: path.join(__dirname, 'public'),
  filename: srcConfig.FILES.CLIENT_BUNDLE,
  chunkFilename: '[id].js',
  publicPath: '/public/'
};

config.module.loaders = [
  {
    test: /.(jsx|js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      plugins: ['transform-runtime'],
      presets: ['es2015', 'react'],
      env: {
        development: {
          plugins: [
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }]
            }]
          ]
        }
      }
    }
  },
  {
    test: /\.styl$/,
    loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader!prepend-style-loader?prepend=[src/resources/global/variables, src/resources/global/mixins]' //  eslint-disable-line
  },
  {
    test: /.(png|jpg|ttf|eot|woff|otf|svg)$/,
    loader: 'url-loader?limit=10000'
  }
];

config.plugins = [
  new ExtractTextPlugin(srcConfig.FILES.STYLE_BUNDLE),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

config.postcss = function() {
  return [autoprefixer];
};

config.stylus = {
  use: [
    poststylus(['autoprefixer'])
  ]
};

module.exports = config;
