import React from 'react';
import { Router, match, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../resources/global/index.styl';
import routes from 'routes';
import config from '../config';
import configureStore from 'store';

const store = configureStore();

match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
  if (err) {
    console.log(err);

    return;
  }

  render(
    <Provider store={ store }>
      <Router { ...renderProps } />
    </Provider>, document.getElementById(config.MOUNTING_POINT)
  );
});
