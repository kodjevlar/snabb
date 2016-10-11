import express from 'express';

import routes from './server-route';

const app = express();

app.use(express.static('public'));
app.use(routes);
app.listen(3000 || process.env.PORT, function() {
  console.log('Server side is ready to render!');
});

export default app;
