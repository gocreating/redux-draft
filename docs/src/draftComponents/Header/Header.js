import React from 'react';
import './Header.css';

let Header = ({
  level, children, ...rest
}) => (
  React.createElement(
    `h${level}`, {
      className: `header-level-${level}`,
    },
    children
  )
);

export default Header;
