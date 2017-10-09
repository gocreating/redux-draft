import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import GithubButton from './GithubButton';

let PageLayout = ({ children }) => (
  <div className="rd wrapper">
    <Helmet>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </Helmet>
    <h1>
      Redux Draft
      {' '}
      <GithubButton
        href="https://github.com/gocreating/redux-draft"
        ariaLabel="Star gocreating/redux-draft on GitHub"
      >
        Star
      </GithubButton>
    </h1>
    <hr />
    <nav className="navigation">
      <NavLink exact to="/">
        Home
      </NavLink>
      {' | '}
      <NavLink to="/examples/raw-editor">
        Raw Editor
      </NavLink>
      {' | '}
      <NavLink to="/examples/blank-editor">
        Blank Editor
      </NavLink>
      {' | '}
      <NavLink to="/examples/bs-editor">
        Bootstrap Editor
      </NavLink>
    </nav>
    <hr />
    {children}
  </div>
);

export default PageLayout;
