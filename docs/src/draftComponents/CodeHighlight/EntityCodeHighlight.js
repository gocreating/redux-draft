import React, { Component } from 'react';
import classNames from 'classnames';
import { reduxDraftEntity } from '../../../../lib';
import CodeHighlight from './CodeHighlight';
import './EntityCodeHighlight.css';

class EntityCodeHighlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      language: 'javascript',
      lineNumbers: false,
      lineHighlight: '',
      value: '',
    };
  }

  componentDidMount() {
    let data = this.props.getData();

    this.setState({
      language: data.language,
      lineNumbers: data.lineNumbers,
      lineHighlight: data.lineHighlight,
      value: data.value,
    });
  }

  setEditMode = (e, editMode) => {
    let { updateReadOnly } = this.props;

    e.stopPropagation();
    updateReadOnly(editMode);
    this.setState({ editMode });
  }

  handleClick = (e) => {
    this.setEditMode(e, true);
  }

  handleSaveClick = (e) => {
    let { updateEntityData, entityKey } = this.props;
    let {
      language,
      lineNumbers,
      lineHighlight,
      value,
    } = this.state;

    if (value) {
      updateEntityData(entityKey, {
        language,
        lineNumbers,
        lineHighlight,
        value,
      });
      this.setEditMode(e, false);
    }
  }

  handleRemoveClick = (e) => {
    let { block, removeBlock } = this.props;

    removeBlock(block.getKey());
    this.setEditMode(e, false);
  }

  handleLanguageChange = (e) => {
    this.setState({ language: e.target.value });
  }

  handleLineNumbersChange = (e) => {
    this.setState({ lineNumbers: e.target.checked });
  }

  handleLineHighlightChange = (e) => {
    this.setState({ lineHighlight: e.target.value });
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    let propData = this.props.getData();
    let {
      editMode,
      language,
      lineNumbers,
      lineHighlight,
      value,
    } = this.state;
    let cx = classNames('rd', 'entity-code-highlight', {
      'active': editMode,
    });

    return (
      <div
        className={cx}
        onClick={this.handleClick}
      >
        <CodeHighlight
          language={propData.language}
          lineNumbers={propData.lineNumbers}
          lineHighlight={propData.lineHighlight}
          value={propData.value}
        />
        {editMode && (
          <div>
            Language:
            <select
              defaultValue={language}
              onChange={this.handleLanguageChange}
            >
              <option value="markup">Markup</option>
              <option value="css">CSS</option>
              <option value="javascript">Javascript</option>
              <option value="clike">C-like</option>
            </select>
            <br />
            <input
              type="checkbox"
              defaultChecked={lineNumbers}
              onChange={this.handleLineNumbersChange}
            />
            Show line numbers
            <br />
            Line highlight:
            <input
              type="text"
              defaultValue={lineHighlight}
              onChange={this.handleLineHighlightChange}
              placeholder="example: 1, 3-5, 10"
            />
            <textarea
              className="textarea"
              defaultValue={value}
              onChange={this.handleValueChange}
            />
            <br />
            <button onClick={this.handleSaveClick}>
              Save
            </button>
            <button onClick={this.handleRemoveClick}>
              Remove
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default reduxDraftEntity(EntityCodeHighlight);
