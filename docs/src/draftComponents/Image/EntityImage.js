import React, { Component } from 'react';
import classNames from 'classnames';
import { reduxDraftEntity } from '../../../../lib';
import Image from './Image';
import './EntityImage.css';

class EntityImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      src: '',
    };
  }

  getData = () => {
    let { contentState, entityKey } = this.props;
    let entity = contentState.getEntity(entityKey);
    let data = entity.getData();

    return data;
  }

  componentDidMount() {
    let data = this.getData();

    this.setState({
      src: data.src,
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
    let { src } = this.state;

    if (src) {
      updateEntityData(entityKey, { src });
      this.setEditMode(e, false);
    }
  }

  handleRemoveClick = (e) => {
    let { block, removeBlock } = this.props;

    removeBlock(block.getKey());
    this.setEditMode(e, false);
  }

  handleChange = (e) => {
    this.setState({ src: e.target.value });
  }

  render() {
    let propData = this.getData();
    let { editMode, src } = this.state;
    let cx = classNames('rd', 'entity-image', {
      'active': editMode,
    });

    return (
      <div
        className={cx}
        onClick={this.handleClick}
      >
        <Image
          alt=""
          src={propData.src}
        />
        {editMode && (
          <div>
            src:
            <input
              type="text"
              value={src}
              onChange={this.handleChange}
            />
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

export default reduxDraftEntity(EntityImage);
