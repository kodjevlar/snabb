import React, { Component } from 'react';

import style from './about.styl';

class About extends Component {
  componentDidMount() {
    console.log('About did mount.');
  }

  render() {
    return (
      <div className={ style.wrapper }>
        { 'About' }
      </div>
    );
  }
}

export default About;
