import React, { Component } from 'react';
import classNames from 'classnames';
import { reduxDraftEntity } from '../../../../lib';
import TeX from './TeX';
import './EntityTeX.css';

class EntityTeX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      math: '',
    };
  }

  componentDidMount() {
    let data = this.props.getData();

    this.setState({
      math: data.math,
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
    let { math } = this.state;

    if (math) {
      updateEntityData(entityKey, { math });
      this.setEditMode(e, false);
    }
  }

  handleRemoveClick = (e) => {
    let { block, removeBlock } = this.props;

    removeBlock(block.getKey());
    this.setEditMode(e, false);
  }

  handleChange = (e) => {
    this.setState({ math: e.target.value });
  }

  render() {
    let propData = this.props.getData();
    let { editMode, math } = this.state;
    let cx = classNames('rd', 'entity-tex', {
      'active': editMode,
    });

    return (
      <div
        className={cx}
        onClick={this.handleClick}
      >
        <TeX
          math={propData.math}
        />
        {editMode && (
          <div>
            <textarea
              className="textarea"
              defaultValue={math}
              onChange={this.handleChange}
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

export default reduxDraftEntity(EntityTeX);
