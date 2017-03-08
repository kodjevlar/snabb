import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import debug from 'debug';

const info = debug('snabb::hmr');

/**
 * Hooks webpack hmr to the current server build.
 *
 * @param  {ExpressApp} app     Express app.
 * @param  {Compiler} compiler  webpack compiler with specified configuration.
 */
export default function(app, compiler) {
  info('setting up dev-middleware');
  app.use(webpackDevMiddleware(compiler, {
    filename: 'bundle.js',
    publicPath: '/public/',
    stats: {
      chunks: false,
      colors: true
    }
  }));

  info('setting up hot-middleware');
  app.use(webpackHotMiddleware(compiler, {
    path: '/__what',
    heartbeat: 2000
  }));
}
