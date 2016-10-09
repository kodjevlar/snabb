import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
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
