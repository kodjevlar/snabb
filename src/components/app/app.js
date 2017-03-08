// @flow
import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';

import style from './app-style.styl';

class App extends PureComponent {
  render() {
    return (
      <div className={ style.app }>
        <h1 className={ style.title }>
          { 'App title' }
        </h1>

        <div className={ style.navigation }>
          <Link to='/purpose'>
            { 'Purpose' }
          </Link>

          <Link to='/about'>
            { 'About' }
          </Link>
        </div>

        <div className={ style.viewPort }>
          { this.props.children }
        </div>

        <div className={ style.footer }>
          { `Snabb footer` }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
