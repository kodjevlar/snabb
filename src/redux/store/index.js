import { createStore, compose, applyMiddleware } from 'redux';
import rootDuck from 'ducks';
import thunk from 'redux-thunk';

/**
 * Enables setting module.hot to a stub for testing purposes
 * @param {[stub]} hot Stub with a sinon spy
 */
export function _setHot(hot) {
  module.hot = hot;
}

export function replace(store) {
  store.replaceReducer(rootDuck);
}

export default function configureStore(serverSideState) {
  const store = createStore(
    rootDuck,
    serverSideState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for ducks
    module.hot.accept(replace(store));
  }

  return store;
}
