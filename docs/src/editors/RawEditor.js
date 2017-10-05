import request from 'superagent';
import React, { Component } from 'react';
import { Editor, RichUtils } from 'draft-js';
import { reduxDraft } from '../../../lib';
import Controls from '../Controls';
import Control from '../Control';
import raw from '../presets/raw';
import configs from '../../configs';
import 'draft-js/dist/Draft.css';
import './RawEditor.css';

class RawEditor extends Component {
  state = {
    isFileUploading: false,
  }

  handleKeyCommand = (command, editorState) => {
    let newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.props.updateEditorState(newState);
      return true;
    }
    return false;
  }

  applyBlock = (blockName) => (e) => {
    this.props.focus();
    this.props.applyBlock(blockName);
  }

  toggleBlock = (blockName) => (e) => {
    this.props.focus();
    this.props.toggleBlock(blockName);
  }

  toggleStyle = (styleName) => (e) => {
    this.props.focus();
    this.props.toggleStyle(styleName);
  }

  handleLinkClick = (e) => {
    let {
      editorState,
      activeMap,
      focus,
      insertEntity,
      applyEntity,
      removeEntity,
    } = this.props;
    let selectionState = editorState.getSelection();
    let isCollapsed = selectionState.isCollapsed();

    if (!activeMap.LINK) {
      let url = prompt('url');

      focus();
      if (!url) {
        return;
      }
      if (isCollapsed) {
        insertEntity('LINK', 'MUTABLE', { url }, url);
      } else {
        applyEntity('LINK', 'MUTABLE', { url });
      }
    } else {
      if (isCollapsed) {
        focus();
        alert('Please select a range');
      } else {
        focus();
        removeEntity();
      }
    }
  }

  handleImageClick = (e) => {
    let { focus, insertEntity } = this.props;
    let src = prompt('src');

    focus();
    if (src) {
      insertEntity('IMAGE', 'IMMUTABLE', { src });
    }
  }

  handleBlockImageClick = (e) => {
    let { focus, insertAtomicBlock } = this.props;
    let src = prompt('src');

    focus();
    if (src) {
      insertAtomicBlock('IMAGE', 'IMMUTABLE', { src });
    }
  }

  handleUploadClick = (e) => {
    let { focus, insertAtomicBlock } = this.props;
    let file = this.fileInput.files[0];
    let form = new FormData();

    if (!file) {
      return alert('Please select a file');
    }
    this.setState({ isFileUploading: true });
    form.append('image', file);
    request
      .post('https://api.imgur.com/3/image')
      .send(form)
      .set('authorization', `Client-ID ${configs.imgur.clientID}`)
      .end((err, res) => {
        this.setState({ isFileUploading: false });
        this.fileInput.value = '';
        if (err) {
          throw err;
        }
        let { link } = res.body.data;

        focus();
        insertAtomicBlock('IMAGE', 'IMMUTABLE', { src: link });
      });
  }

  render() {
    let {
      setRef,
      editorState,
      updateEditorState,
      blockRenderMap,
      blockRendererFn,
      customStyleMap,
      readOnly,
      activeMap,
    } = this.props;
    let { isFileUploading } = this.state;
    let selectionState = editorState.getSelection();
    let isCollapsed = selectionState.isCollapsed();

    return (
      <div className="raw-editor">
        <Controls>
          <Control
            label="Normal"
            active={activeMap['unstyled']}
            onClick={this.applyBlock('unstyled')}
          />
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
        <Controls>
          <Control
            label={
              activeMap.LINK && !isCollapsed ?
              'Remove Link' :
              'Link'
            }
            disabled={activeMap.LINK && isCollapsed}
            active={activeMap.LINK}
            onClick={this.handleLinkClick}
          />
          <Control
            label="Inline Image"
            active={activeMap.IMAGE}
            onClick={this.handleImageClick}
          />
        </Controls>
        <Controls>
          <Control
            label="Block Image"
            onClick={this.handleBlockImageClick}
          />
        </Controls>
        <div className="editor">
          <Editor
            ref={setRef}
            editorState={editorState}
            onChange={updateEditorState}
            handleKeyCommand={this.handleKeyCommand}
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRendererFn}
            customStyleMap={customStyleMap}
            readOnly={readOnly}
            placeholder="write something..."
          />
        </div>
        <div>
          <form>
            <legend>Upload Block Image:</legend>
            <input
              ref={ref => { this.fileInput = ref; }}
              type="file"
            />
            <button
              type="button"
              disabled={isFileUploading}
              onClick={this.handleUploadClick}
            >
              {isFileUploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxDraft(raw)(RawEditor);
