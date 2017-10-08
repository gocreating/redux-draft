import React, { Component } from 'react';
import classNames from 'classnames';
import noImageAvailable from '../../../public/no_image_available.jpg';
import './Image.css';

class Image extends Component {
  constructor() {
    super();
    this.handleImageError = this._handleImageError.bind(this);
    this.state = {
      isError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ isError: false });
    }
  }

  _handleImageError() {
    this.setState({ isError: true });
  }

  render() {
    let { alt, src, ...rest } = this.props;
    let { isError } = this.state;
    let cx = classNames('rd image', {
      'failed': isError,
    });

    return (
      <img
        className={cx}
        alt={alt || 'No Image Available'}
        src={isError ? noImageAvailable : src}
        onError={this.handleImageError}
        {...rest}
      />
    );
  }
}

export default Image;
