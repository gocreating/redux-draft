import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

export default (config) => (WrappedComponent) => {
  class ReduxDraft extends Component {
    componentDidMount() {
      this.props.init();
    }

    render() {
      let { name } = this.props;

      return name !== undefined ? (
        <WrappedComponent {...this.props} />
      ) : null;
    }
  }

  let mapStateToProps = (state) => {
    let currentDraft = state.draft[config.name] || {};

    return {
      name: currentDraft.name,
      editorState: currentDraft.editorState,
    };
  };
  let mapDispatchToProps = (dispatch) => {
    let bindDraft = (actionCreator) => actionCreator.bind(null, config.name);
    let bondDraftActionCreators = {};

    Object
      .keys(actionCreators)
      .forEach(ac => {
        bondDraftActionCreators[ac] = bindDraft(actionCreators[ac]);
      });

    return {
      ...bindActionCreators(bondDraftActionCreators, dispatch),
      dispatch,
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ReduxDraft);
};
