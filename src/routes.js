import React from 'react';
import { Route, IndexRoute } from 'react-router';

import About from './about/index.js';
import Purpose from './purpose/index.js';
import App from './app.js';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ About } />
    <Route path='/about' component={ About } />
    <Route path='/purpose' component={ Purpose } />
  </Route>
);
