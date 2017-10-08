import classNames from 'classnames';
import React, { Component } from 'react';

class ControlButton extends Component {
  render() {
    let {
      label,
      active,
      disabled,
      ...rest
    } = this.props;

    let cx = classNames(
      'btn btn-default', {
        'active': active,
        'disabled': disabled,
      }
    );

    return (
      <button
        type="button"
        className={cx}
        disabled={disabled}
        {...rest}
      >
        {label}
      </button>
    );
  }
}

export default ControlButton;
