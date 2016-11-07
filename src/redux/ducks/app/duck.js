// Action types
const SET_SOME_PROP = 'SET_SOME_PROP';
const SET_ANOTHER_PROP = 'SET_ANOTHER_PROP';

const initialState = {
  someProp: 'someValue',
  anotherProp: 'anotherValue'
};

// Reducer
export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOME_PROP:
       return {
         ...state,
         someProp: action.someProp
      };

    case SET_ANOTHER_PROP:
       return {
         ...state,
         anotherProp: action.anotherProp
      };

    default:
      return state;
    }
}

// Action creators
export function setSomeProp(someProp) {
  return {
    type: SET_SOME_PROP,
    someProp
  };
}

export function setAnotherProp(anotherProp) {
  return {
    type: SET_ANOTHER_PROP,
    anotherProp
  };
}

// Export all actionCreators
export const actions = {
  setSomeProp,
  setAnotherProp
}
