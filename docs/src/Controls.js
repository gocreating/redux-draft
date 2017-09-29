import React, { Component } from 'react';
import Box from './Box';

class Controls extends Component {
  render() {
    return (
      <Box
        as="div"
        className="controls"
        {...this.props}
      />
    );
  }
}

export default Controls;
