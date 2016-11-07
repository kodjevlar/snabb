import { expect } from 'utils/test-helper';
import { reducer, setSomeProp, setAnotherProp } from 'ducks/app/duck';

describe('App duck', function() {
  it('should set someProp', function() {
    const initialState = {
      someProp: 'someValue',
      anotherProp: 'anotherValue'
    };

    const newState = reducer(initialState, setSomeProp('New value'));

    expect(newState).to.deep.equal({
      someProp: 'New value',
      anotherProp: 'anotherValue'
    });
  });

  it('should set anotherProp', function() {
    const initialState = {
      someProp: 'someValue',
      anotherProp: 'anotherValue'
    };

    const newState = reducer(initialState, setAnotherProp('New value'));

    expect(newState).to.deep.equal({
      someProp: 'someValue',
      anotherProp: 'New value'
    });
  });

  it('should return initial state', function() {
    const initialState = {
      someProp: 'someValue',
      anotherProp: 'anotherValue'
    };

    const newState = reducer(undefined, {});

    expect(newState).to.deep.equal(initialState);
  });
});
