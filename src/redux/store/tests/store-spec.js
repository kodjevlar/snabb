import { expect } from 'utils/test-helper';
import sinon from 'sinon';

import * as store from '../';

describe('Store', function() {
  it('should hot replace reducer in dev env', function() {
    const acceptSpy = sinon.spy();
    const hotStub = {
      accept: acceptSpy
    };

    store._setHot(hotStub);
    store.default({});

    expect(acceptSpy.callCount).to.equal(1);
  });

  it('should add redux dev tools extension to window', function() {
    window.devToolsExtension = sinon.stub().returns(f => f);

    store.default({});

    expect(window.devToolsExtension.callCount).to.equal(1);
  });
});
