import { Router as expressRouter } from 'express';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import { match } from 'react-router';
import debug from 'debug';
import buildPage from './build-page';
import routes from 'routes';

const serverRouteDebug = debug('snabb::server::route');
const router = expressRouter();

router.get('*', function(req, res) {
  match({ routes, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      try {
        renderToStaticMarkup(buildPage(renderProps, req.url)).pipe(res);
      } catch (e) {
        serverRouteDebug(e);
      }
    } else {
      res.status(404).send('Not found');
    }
  });
});

export default router;
