import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

export default (config) => (WrappedComponent) => {
  class ReduxDraft extends Component {
    componentDidMount() {
      this.props.init(config);
    }

    render() {
      let {
        name,
        config,
        editorState,
        ...rest
      } = this.props;

      return name !== undefined ? (
        <WrappedComponent
          name={name}
          config={config}
          editorState={editorState}
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
