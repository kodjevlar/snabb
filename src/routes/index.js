// @flow
import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from 'components/app';

export default (
  <Route path='/' component={ App }>
    <IndexRedirect to='/about' />

    <Route path='/about' getComponent={ async (nextState, cb) => {
      const About = await import('components/about');

      cb(null, About.default);
    } } />

    <Route path='/purpose' getComponent={ async(nextState, cb) => {
      const Purpose = await import('components/purpose');

      cb(null, Purpose.default);
    } } />
  </Route>
);
