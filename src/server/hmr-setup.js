import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

/**
 * Hooks webpack hmr to the current server build.
 *
 * @param  {ExpressApp} app     Express app.
 * @param  {Compiler} compiler  webpack compiler with specified configuration.
 */
export default function(app, compiler) {
  console.log('Server is running on development mode');

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
}
