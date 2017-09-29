import React, { Component } from 'react';
import classNames from 'classnames';
import Box from './Box';

class Control extends Component {
  render() {
    let {
      label,
      active,
      disabled,
      ...rest
    } = this.props;
    let cx = classNames(
      'control', {
        'active': active,
        'disabled': disabled,
      }
    );

    return (
      <Box
        className={cx}
        {...rest}
      >
        {label}
      </Box>
    );
  }
}

export default Control;
