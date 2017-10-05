import React from 'react';

let GithubButton = ({
  href,
  size,
  countAriaLabel,
  ariaLabel,
  showCount,
  children,
  ...rest
}) => (
  <a
    className="github-button"
    href={href}
    data-size={size}
    data-count-aria-label={countAriaLabel}
    aria-label={ariaLabel}
    data-show-count={showCount}
    {...rest}
  >
    {children}
  </a>
);

GithubButton.defaultProps = {
  size: 'large',
  countAriaLabel: '# stargazers on GitHub',
  showCount: true,
};

export default GithubButton;
