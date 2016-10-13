import express from 'express';
import webpack from 'webpack';

import config from '../../webpack.config';
import routes from './server-route';
import hmr from './hmr-setup';

const app = express();
const compiler = webpack(config);

switch (process.env.NODE_ENV) {
  case 'production':
    console.log('Running in production mode.');
    app.use('/public', express.static('public'));
    break;

  default:
    console.log('Running in development mode.');
    hmr(app, compiler);
}

app.use(routes);

export default port => {
  app.listen(port, function() {
    console.log('Server side is ready to render!');
  });
};
