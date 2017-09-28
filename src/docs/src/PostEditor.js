import React, { Component } from 'react';
import { Editor } from 'draft-js';
import { reduxDraft } from '../../../lib/index';
import 'draft-js/dist/Draft.css';
import './PostEditor.css';

class PostEditor extends Component {
  render() {
    let { editorState, updateEditorState } = this.props;

    return (
      <div className="post-editor">
        <Editor
          editorState={editorState}
          onChange={updateEditorState}
          placeholder="write something..."
        />
      </div>
    );
  }
}

export default reduxDraft({
  name: 'BLOG_POST',
})(PostEditor);
