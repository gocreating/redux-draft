import React, { Component } from 'react';
import { Editor } from 'draft-js';
import { reduxDraft } from '../../../../lib';
import draftConfig from './config';
import 'draft-js/dist/Draft.css';
import './BlankEditor.css';

class BlankEditor extends Component {
  render() {
    let {
      setRef,
      editorState,
      updateEditorState,
    } = this.props;

    return (
      <div className="blank-editor">
        <div className="editor">
          <Editor
            ref={setRef}
            editorState={editorState}
            onChange={updateEditorState}
            placeholder="write something..."
          />
        </div>
      </div>
    );
  }
}

export default reduxDraft(draftConfig)(BlankEditor);
