const path = require('path');
const webpack = require('webpack');

const config = require('./src/config/src-config');

const { SRC } = config;

const devConfig = {
  module: {},
  resolve: {
    modules: config.MODULES,
    extensions: config.EXTENTIONS
  },
  devtool: 'eval-cheap-module-source-map'
};

devConfig.entry = {
  index: [
    config.ENTRIES.index,
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false'
  ]
};

devConfig.output = {
  path: config.PATH,
  filename: config.filename,
  chunkFilename: '[id].js',
  publicPath: config.PUBLIC_PATH
};

devConfig.resolve.alias = {
  routes: path.join(SRC, 'routes'),
  containers: path.join(SRC, 'containers'),
  components: path.join(SRC, 'components'),
  utils: path.join(SRC, 'utils'),
  resources: path.join(SRC, 'resources'),
  server: path.join(SRC, 'server'),
  state: path.join(SRC, 'redux', 'state'),
  ducks: path.join(SRC, 'redux', 'ducks'),
  store: path.join(SRC, 'redux', 'store'),
  config: path.join(SRC, 'config'),
  services: path.join(SRC, 'services'),
  lang: path.join(SRC, 'lang'),
  icons: path.join(SRC, 'resources', 'icons')
};

devConfig.module.rules = [
  {
    test: /.(jsx|js)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
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
          ],
          env: {
            development: {
              plugins: [
                [ 'react-transform', {
                  transforms: [ {
                    transform: 'react-transform-hmr',
                    imports: [ 'react' ],
                    locals: [ 'module' ]
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: [ 'react', 'redbox-react' ]
                  } ]
                } ]
              ]
            }
          }
        }
      }
    ]
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
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
  },
  {
    test: /\.css/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /.(png|jpg|ttf|eot|woff|otf)$/,
    use: [
      {
        loader: 'url-loader'
      }
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
  }
];

devConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
];

devConfig.stats = {
  chunks: false,
  colors: true
};


module.exports = devConfig;
