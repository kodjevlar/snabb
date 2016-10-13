import React from 'react';
import { RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import config from '../config';

export default renderProps => (
  <html>
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
        content='width=device-width, minimum-scale=1.0'
      />

      { process.env.NODE_ENV === 'production' && (
        <link rel='stylesheet' type='text/css' href={ `${config.FILES.PUBLIC_PATH}${config.FILES.STYLE_BUNDLE}` } />
      ) }
    </head>

    <body>
      <div
        id={ `${config.MOUNTING_POINT}` }
        dangerouslySetInnerHTML={ { __html: renderToString(
          <RouterContext { ...renderProps } />)
        } }
      />

      <script dangerouslySetInnerHTML={ { __html: `
        console.info('Server-side rendered.')
      ` } } />
      <script src={ `${config.FILES.PUBLIC_PATH}${config.FILES.CLIENT_BUNDLE}` } />
    </body>
  </html>
);
