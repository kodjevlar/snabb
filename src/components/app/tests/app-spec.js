import { renderComponent, expect } from 'utils/test-helper';
import App from 'components/app/app';
import style from 'components/app/app-style.styl';

describe('App', function() {
  describe('Mount', function() {
    let component;

    beforeEach(function() {
      component = renderComponent(App);
    });

    it('should mount component', function() {
      expect(component).to.contain('Snabb footer');
    });

    it('should load style', function() {
      expect(component).to.have.attr('class', style.app);
    });
  });
});
