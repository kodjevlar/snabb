import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootDuck from 'ducks';
import initialState from 'state';

export default function configureStore() {
  const store = createStore(
    rootDuck,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for ducks
    module.hot.accept(() => {
      const nextRootDuck = rootDuck;

      store.replaceReducer(nextRootDuck);
    });
  }

  return store;
}
