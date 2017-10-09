import React from 'react';
import './Quote.css';

let Quote = ({ children }) => (
  <blockquote className="quote">
    {children}
  </blockquote>
);

export default Quote;
