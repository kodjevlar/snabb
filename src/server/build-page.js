// @flow
import React from 'react';
import { RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';

import configureStore from './redux/store';
import config from '../config';

addLocaleData([ ...en ]);
const store = configureStore();

const serverSideState = store.getState();

function renderHead(criticalAsset: string = 'index') {
  let head;

  if (process.env.NODE_ENV === 'production') {
    head = (
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href={ '/public/index.css' }
        />

        <link
          rel='stylesheet'
          type='text/css'
          href={ '/public/feed.css' }
        />

        <title>
          { config.TITLE }
        </title>

        <meta charSet='utf-8' />

        <meta
          name={ config.TITLE }
          content={ config.DESCRIPTION }
        />

        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1.0, user-scalable=0'
        />

        <link
          rel='stylesheet'
          type='text/css'
          href={ `/public/index.css` }
        />

        <link
          rel='stylesheet'
          type='text/css'
          href={ `/public/${criticalAsset}.css` }
        />

        <link
          href='https://fonts.googleapis.com/css?family=Noto+Sans'
          rel='stylesheet'
        />
      </head>
    );
  } else {
    head = (
      <head>
        <title>
          { config.TITLE }
        </title>

        <meta charSet='utf-8' />

        <meta
          name={ config.TITLE }
          content={ config.DESCRIPTION }
        />

        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1.0, user-scalable=0'
        />

        <link
          href='https://fonts.googleapis.com/css?family=Noto+Sans'
          rel='stylesheet'
        />
      </head>
    );
  }

  return head;
}

function renderBellowFold(criticalAsset: string = 'index') {
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className='___client-hook___'>
        <script dangerouslySetInnerHTML={ { __html: `
            window.__PRELOADED_STATE__ = ${JSON.stringify(serverSideState)}
          ` } }
        />

        <script src={ `/public/vendor.js` } />

        <script defer src={ `/public/index.js` } />

        <script defer src={ `/public/${criticalAsset}.js` } />
      </div>
    );
  } else {
    return (
      <div className='___client-hook___'>
        <script dangerouslySetInnerHTML={ { __html: `
            window.__PRELOADED_STATE__ = ${JSON.stringify(serverSideState)}
          ` } }
        />

        <script src={ `/public/index.js` } />
      </div>
    );
  }
}

function renderContent(renderProps: Object) {
  return (
    <div
      id={ `${config.MOUNTING_POINT}` }
      dangerouslySetInnerHTML={ { __html: renderToString(
        <Provider store={ store }>
          <RouterContext { ...renderProps } />
        </Provider>
      ) } }
    />
  );
}

function buildPage(renderProps: Object, url: string): ReactElement {
  const criticalAsset = Object.keys(config.ENTRIES).find(name => url.indexOf(name) > -1);

  return (
    <html>
      { renderHead(criticalAsset) }

      <body>
        { renderContent(renderProps) }

        { renderBellowFold(criticalAsset) }
      </body>
    </html>
  );
}

export default buildPage;
