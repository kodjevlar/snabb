import React, { Component } from 'react';

import style from './about.styl';

class About extends Component {
  getText() {
    return 'Snabbar an sahar blir det inte!';
  }

  render() {
    return (
      <div className={ style.wrapper }>
        { this.getText() }
      </div>
    );
  }
}

export default About;
