import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  class reduxDraftEntity extends Component {
    constructor() {
      super();
      this.getData = this._getData.bind(this);
    }

    _getData() {
      let { contentState, entityKey } = this.props;
      let entity = contentState.getEntity(entityKey);
      let data = entity.getData();

      return data;
    }

    render() {
      let { _reduxDraft } = this.context;

      return (
        <WrappedComponent
          getData={this.getData}
          {..._reduxDraft}
          {...this.props}
        />
      );
    }
  }

  reduxDraftEntity.contextTypes = {
    _reduxDraft: PropTypes.object,
  };

  return reduxDraftEntity;
};
