import React, { Component } from 'react';
import { Editor } from 'draft-js';
import { reduxDraft } from '../../lib';
import Controls from './Controls';
import Control from './Control';
import blogPost from './presets/blogPost';
import 'draft-js/dist/Draft.css';
import './PostEditor.css';

class PostEditor extends Component {
  toggleStyle = (styleName) => (e) => {
    this.props.focus();
    this.props.toggleStyle(styleName);
  }

  render() {
    let {
      setRef,
      editorState,
      updateEditorState,
      customStyleMap,
      activeMap,
    } = this.props;

    return (
      <div className="post-editor">
        <Controls>
          <Control
            label="Bold"
            active={activeMap.BOLD}
            onClick={this.toggleStyle('BOLD')}
          />
          <Control
            label="Italic"
            active={activeMap.ITALIC}
            onClick={this.toggleStyle('ITALIC')}
          />
          <Control
            label="Underline"
            active={activeMap.UNDERLINE}
            onClick={this.toggleStyle('UNDERLINE')}
          />
          <Control
            label="Strike Through"
            active={activeMap.STRIKETHROUGH}
            onClick={this.toggleStyle('STRIKETHROUGH')}
          />
          <Control
            label="Monospace"
            active={activeMap.CODE}
            onClick={this.toggleStyle('CODE')}
          />
        </Controls>
        <Controls>
          <Control
            label="Red"
            active={activeMap.COLOR_RED}
            onClick={this.toggleStyle('COLOR_RED')}
          />
          <Control
            label="Code"
            active={activeMap.CUSTOM_CODE}
            onClick={this.toggleStyle('CUSTOM_CODE')}
          />
        </Controls>
        <div className="editor">
          <Editor
            ref={setRef}
            editorState={editorState}
            onChange={updateEditorState}
            customStyleMap={customStyleMap}
            placeholder="write something..."
          />
        </div>
      </div>
    );
  }
}

export default reduxDraft(blogPost)(PostEditor);
