import React from 'react';
import { Router, match, browserHistory } from 'react-router';
import { render } from 'react-dom';

import routes from 'routes';
import config from '../config';

match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
  if (err) {
    console.log(err);

    return;
  }

  render(<Router { ...renderProps } />, document.getElementById(config.MOUNTING_POINT));
});
