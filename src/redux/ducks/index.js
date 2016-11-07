import { combineReducers } from 'redux';

import { reducer as appDuck } from './app/duck';

export default combineReducers({
  appDuck
});
