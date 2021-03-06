import request from 'superagent';
import React, { Component } from 'react';
import { Editor, RichUtils } from 'draft-js';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { reduxDraft } from '../../../../lib';
import ControlButton from './ControlButton';
import draftConfig from './config';
import configs from '../../../configs';
import 'draft-js/dist/Draft.css';
import './BsEditor.css';

class BsEditor extends Component {
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

  handleBlockImageClick = (e) => {
    let { focus, insertAtomicBlock } = this.props;
    let src = prompt('src');

    focus();
    if (src) {
      insertAtomicBlock('IMAGE', 'IMMUTABLE', { src });
    }
  }

  handleTeXClick = (e) => {
    let { focus, insertAtomicBlock } = this.props;

    focus();
    insertAtomicBlock('TEX', 'IMMUTABLE', {
      math: 'P(E) = {n \\choose k} p^k (1-p)^{ n-k} ',
    });
  }

  handleCodeHighlightClick = (e) => {
    let { focus, insertAtomicBlock } = this.props;

    focus();
    insertAtomicBlock('CODE_HIGHLIGHT', 'IMMUTABLE', {
      language: 'javascript',
      lineNumbers: false,
      lineHighlight: '',
      value: 'console.log(\'Hello world!\');',
    });
  }

  handleFileChange = (e) => {
    let { updateReadOnly, focus, insertAtomicBlock } = this.props;
    let file = this.fileInput.files[0];
    let form = new FormData();

    if (!file) {
      return;
    }
    updateReadOnly(true);
    this.setState({ isFileUploading: true });
    form.append('image', file);
    request
      .post('https://api.imgur.com/3/image')
      .send(form)
      .set('authorization', `Client-ID ${configs.imgur.clientID}`)
      .end((err, res) => {
        updateReadOnly(false);
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
      <div className="bs-editor">
        <ButtonToolbar>
          <Col md={2}>
            <select
              className="form-control"
              onChange={(e) => {
                this.applyBlock(e.target.value)(e);
              }}
            >
              <option
                value="unstyled"
                selected={activeMap['unstyled']}
              >
                Normal Text
              </option>
              <option
                value="header-one"
                selected={activeMap['header-one']}
              >
                H1
              </option>
              <option
                value="header-two"
                selected={activeMap['header-two']}
              >
                H2
              </option>
              <option
                value="header-three"
                selected={activeMap['header-three']}
              >
                H3
              </option>
              <option
                value="header-four"
                selected={activeMap['header-four']}
              >
                H4
              </option>
              <option
                value="header-five"
                selected={activeMap['header-five']}
              >
                H5
              </option>
              <option
                value="header-six"
                selected={activeMap['header-six']}
              >
                H6
              </option>
            </select>
          </Col>
          <ButtonGroup>
            <ControlButton
              label={<i className="fa fa-quote-left" aria-hidden="true" />}
              active={activeMap.blockquote}
              onClick={this.toggleBlock('blockquote')}
            />
            <ControlButton
              label={<i className="fa fa-code" aria-hidden="true" />}
              active={activeMap['code-block']}
              onClick={this.toggleBlock('code-block')}
            />
            <ControlButton
              label={<i className="fa fa-list" aria-hidden="true" />}
              active={activeMap['unordered-list-item']}
              onClick={this.toggleBlock('unordered-list-item')}
            />
            <ControlButton
              label={<i className="fa fa-list-ol" aria-hidden="true" />}
              active={activeMap['ordered-list-item']}
              onClick={this.toggleBlock('ordered-list-item')}
            />
          </ButtonGroup>

          <ButtonGroup>
            <ControlButton
              label={<i className="fa fa-bold" aria-hidden="true" />}
              active={activeMap.BOLD}
              onClick={this.toggleStyle('BOLD')}
            />
            <ControlButton
              label={<i className="fa fa-italic" aria-hidden="true" />}
              active={activeMap.ITALIC}
              onClick={this.toggleStyle('ITALIC')}
            />
            <ControlButton
              label={<i className="fa fa-underline" aria-hidden="true" />}
              active={activeMap.UNDERLINE}
              onClick={this.toggleStyle('UNDERLINE')}
            />
            <ControlButton
              label={<i className="fa fa-strikethrough" aria-hidden="true" />}
              active={activeMap.STRIKETHROUGH}
              onClick={this.toggleStyle('STRIKETHROUGH')}
            />
            <ControlButton
              label={<i className="fa fa-code" aria-hidden="true" />}
              active={activeMap.CODE}
              onClick={this.toggleStyle('CODE')}
            />
          </ButtonGroup>

          <ButtonGroup>
            <ControlButton
              label={activeMap.LINK && !isCollapsed ?
              <i className="fa fa-unlink" aria-hidden="true" /> :
              <i className="fa fa-link" aria-hidden="true" />}
              disabled={activeMap.LINK && isCollapsed}
              active={activeMap.LINK}
              onClick={this.handleLinkClick}
            />
            <ControlButton
              label={<i className="fa fa-picture-o" aria-hidden="true" />}
              onClick={this.handleBlockImageClick}
            />
            <ControlButton
              label={
                isFileUploading ?
                <i className="fa fa-spinner fa-spin" aria-hidden="true" /> :
                <i className="fa fa-upload" aria-hidden="true" />
              }
              disabled={isFileUploading}
              onClick={() => this.fileInput.click()}
            />
            <ControlButton
              label={<i className="fa fa-calculator" aria-hidden="true" />}
              onClick={this.handleTeXClick}
            />
            <ControlButton
              label={<i className="fa fa-file-code-o" aria-hidden="true" />}
              onClick={this.handleCodeHighlightClick}
            />
          </ButtonGroup>
        </ButtonToolbar>

        <input
          style={{ display: 'none' }}
          ref={ref => { this.fileInput = ref; }}
          onChange={this.handleFileChange}
          type="file"
        />
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
      </div>
    );
  }
}

export default reduxDraft(draftConfig)(BsEditor);
