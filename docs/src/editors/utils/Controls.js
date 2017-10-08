import React, { Component } from 'react';
import Box from './Box';

class Controls extends Component {
  render() {
    let { title, children, ...rest } = this.props;

    return (
      <Box
        as="div"
        className="controls"
        {...rest}
      >
        <span className="title">
          {title}
        </span>
        <span>
          {children}
        </span>
      </Box>
    );
  }
}

export default Controls;
