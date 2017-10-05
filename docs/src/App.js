import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

let App = () => (
  <Router basename="/redux-draft">
    <Switch>
      <Route
        exact
        path="/"
        component={require('./pages/HomePage').default}
      />
      <Route
        exact
        path="/examples/raw-editor"
        component={require('./pages/examples/RawEditorPage').default}
      />
    </Switch>
  </Router>
);

export default App;
