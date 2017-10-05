import React from 'react';

let Link = ({ children, ...rest }) => (
  <a {...rest}>
    {children}
  </a>
);

export default Link;
