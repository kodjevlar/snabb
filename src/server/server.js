import express from 'express';
import webpack from 'webpack';

import config from '../../webpack.config';
import routes from './server-route';
import hmr from './hmr-setup';

const app = express();
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  hmr(app, compiler);
}

app.use(express.static('public'));
app.use(routes);

export default port => {
  app.listen(port, function() {
    console.log('Server side is ready to render!');
  });
};
