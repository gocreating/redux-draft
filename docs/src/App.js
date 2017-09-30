import React, { Component } from 'react';
import PostEditor from './PostEditor';
import PostPreview from './PostPreview';
import PostRaw from './PostRaw';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Redux Draft</h1>
        <hr />
        <h2>Editor</h2>
        <PostEditor />
        <h2>Preview</h2>
        <PostPreview />
        <h2>Raw</h2>
        <PostRaw />
      </div>
    );
  }
}

export default App;
