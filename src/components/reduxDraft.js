import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

export default (config) => (WrappedComponent) => {
  class ReduxDraft extends Component {
    componentDidMount() {
      let { _initialized, init } = this.props;

      if (!_initialized) {
        init(config);
      }
    }

    render() {
      let {
        _instance,
        name,
        config,
        editorState,
        customStyleMap,
        ...rest
      } = this.props;

      return name !== undefined ? (
        <WrappedComponent
          focus={(_instance || {}).focus}
          name={name}
          config={config}
          editorState={editorState}
          customStyleMap={customStyleMap}
          {...rest}
        />
      ) : null;
    }
  }

  let mapStateToProps = (state) => {
    let currentDraft = state.draft[config.name] || {};

    return currentDraft;
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
