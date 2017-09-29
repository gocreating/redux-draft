import React, { Component } from 'react';

class Box extends Component {
  render() {
    let { as, children, ...rest } = this.props;

    return React.createElement(
      as,
      rest,
      children
    );
  }
}

Box.defaultProps = {
  as: 'span',
};

export default Box;
