import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  class reduxDraftEntity extends Component {
    render() {
      let { _reduxDraft } = this.context;

      return (
        <WrappedComponent
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
