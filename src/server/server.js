import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import routes from './server-route';

const app = express();

console.log('Server is running on development mode');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../../webpack.config');
let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/public/',
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.use(express.static('public'));
app.use(routes);
app.listen(3000 || process.env.PORT, function() {
  console.log('Server side is ready to render!');
});

export default app;
