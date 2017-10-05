import React from 'react';
import './Image.css';

let Image = ({ block, alt, ...rest }) => (
  <img
    className="rd image"
    alt={alt || 'Image Not Found'}
    {...rest}
  />
);

export default Image;
