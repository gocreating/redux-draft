import React, { Component } from 'react';
import { Editor } from 'draft-js';
import { reduxDraft } from '../../lib';
import Controls from './Controls';
import Control from './Control';
import blogPost from './presets/blogPost';
import 'draft-js/dist/Draft.css';
import './PostEditor.css';

class PostEditor extends Component {
  toggleBlock = (blockName) => (e) => {
    this.props.focus();
    this.props.toggleBlock(blockName);
  }

  toggleStyle = (styleName) => (e) => {
    this.props.focus();
    this.props.toggleStyle(styleName);
  }

  render() {
    let {
      setRef,
      editorState,
      updateEditorState,
      blockRenderMap,
      blockRendererFn,
      customStyleMap,
      activeMap,
    } = this.props;

    return (
      <div className="post-editor">
        <Controls>
          <Control
            label="H1"
            active={activeMap['header-one']}
            onClick={this.toggleBlock('header-one')}
          />
          <Control
            label="H2"
            active={activeMap['header-two']}
            onClick={this.toggleBlock('header-two')}
          />
          <Control
            label="H3"
            active={activeMap['header-three']}
            onClick={this.toggleBlock('header-three')}
          />
          <Control
            label="H4"
            active={activeMap['header-four']}
            onClick={this.toggleBlock('header-four')}
          />
          <Control
            label="H5"
            active={activeMap['header-five']}
            onClick={this.toggleBlock('header-five')}
          />
          <Control
            label="H6"
            active={activeMap['header-six']}
            onClick={this.toggleBlock('header-six')}
          />
          <Control
            label="Blockquote"
            active={activeMap.blockquote}
            onClick={this.toggleBlock('blockquote')}
          />
          <Control
            label="Code Block"
            active={activeMap['code-block']}
            onClick={this.toggleBlock('code-block')}
          />
          <Control
            label="UL"
            active={activeMap['unordered-list-item']}
            onClick={this.toggleBlock('unordered-list-item')}
          />
          <Control
            label="OL"
            active={activeMap['ordered-list-item']}
            onClick={this.toggleBlock('ordered-list-item')}
          />
        </Controls>
        <Controls>
          <Control
            label="Header 1"
            active={activeMap.HEADER_LEVEL_1}
            onClick={this.toggleBlock('HEADER_LEVEL_1')}
          />
          <Control
            label="Header 2"
            active={activeMap.HEADER_LEVEL_2}
            onClick={this.toggleBlock('HEADER_LEVEL_2')}
          />
        </Controls>
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
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRendererFn}
            customStyleMap={customStyleMap}
            placeholder="write something..."
          />
        </div>
      </div>
    );
  }
}

export default reduxDraft(blogPost)(PostEditor);
