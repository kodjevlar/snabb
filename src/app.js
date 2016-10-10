import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import style from './app-style.styl';

class App extends Component {
  render() {
    return (
      <div className={ style.root }>
        <div className={ style.title }>
          { 'App title' }
        </div>
        { this.props.children }

        <div>
          <Link to='/purpose'>
            { 'Purpose' }
          </Link>

          <Link to='/about'>
            { 'About' }
          </Link>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
