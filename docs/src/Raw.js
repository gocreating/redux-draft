import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';

class Raw extends Component {
  render() {
    let { editorState } = this.props;
    let contentState = editorState.getCurrentContent();
    let raw = convertToRaw(contentState);

    return (
      <pre>
        {JSON.stringify(raw, null, 2)}
      </pre>
    );
  }
}

export default Raw;
