// @flow
import express from 'express';
import webpack from 'webpack';
import compression from 'compression';
import debug from 'debug';

import webpackConfig from '../../webpack.config';
import config from '../config/src-config';
import routes from './server-route';
import hmr from './hmr-setup';

const snabb = express();
const info = debug('snabb::server');

switch (process.env.NODE_ENV) {
  case 'production':
    info('running in production mode.');
    snabb.use(compression({
      // gzip request to public folder.
      filter: req => req.baseUrl.indexOf(config.PUBLIC_PATH) === 0,
      level: 9 // 0 - 9 compression level.
    }));

    info(`using ${config.PATH} for public assets`);
    snabb.use('/public', express.static(config.PATH));
    break;

  default:
    info('running in development mode.');
    hmr(snabb, webpack(webpackConfig));
}

snabb.use(routes);

export default (port: number = 3000) => {
  snabb.listen(port, function() {
    info(`ready on port: ${port}`);
  });
};
