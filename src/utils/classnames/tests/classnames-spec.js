import { expect } from 'utils/test-helper';

import classnames from '../classnames';

describe('classnames', function() {
  it('should comprise classname of a single string', function() {
    const classNames = classnames('wrapper');

    expect(classNames).to.equal('wrapper');
  });

  it('should comprise classnames from logic flag', function() {
    const classNames = classnames('wrapper', {
      'active-class': true
    });

    expect(classNames).to.equal('wrapper active-class');
  });
});
