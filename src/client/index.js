/* @flow */
import React from 'react';
import { Router, match, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'whatwg-fetch';

import routes from 'routes';
import config from '../config';
import configureStore from 'store';

const store = configureStore(window.__PRELOADED_STATE__);

match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
  if (err) {
    console.log(err);

    return;
  }

  render(
    <Provider store={ store }>
      <Router { ...renderProps } />
    </Provider>,
    document.getElementById(config.MOUNTING_POINT)
  );
});

// Load additional stlye files async.
function collectAssets() {
  const styleGroup = document.createElement('div');

  Object.keys(config.ENTRIES).map(name => {
    const style = document.createElement('link');

    style.href = `/public/${name}.css`;
    style.type = 'text/css';
    style.rel = 'stylesheet';

    styleGroup.appendChild(style);
  });

  const hook = document.getElementsByClassName('___client-hook___')[0];

  hook.appendChild(styleGroup);
};

if (process.env.NODE_ENV === 'production') {
  window.requestAnimationFrame(collectAssets);
}
