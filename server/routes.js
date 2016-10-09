import { Router as expressRouter } from 'express';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import { match } from 'react-router';

const router = expressRouter();

import generateMarkup from './generate-markup';
import routes from '../src/routes';

router.get('*', function(req, res) {
  match({ routes, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      renderToStaticMarkup(generateMarkup(renderProps)).pipe(res);
    } else {
      res.status(404).send('Not found');
    }
  });
});

export default router;
