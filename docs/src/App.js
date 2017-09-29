import React, { Component } from 'react';
import PostEditor from './PostEditor';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Redux Draft</h1>
        <PostEditor />
      </div>
    );
  }
}

export default App;
