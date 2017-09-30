import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
  TOGGLE_BLOCK,
  TOGGLE_STYLE,
} from '../constants/ActionTypes';

export let init = (editorName, config) => {
  return {
    type: INIT,
    editorName,
    config,
  };
};

export let setRef = (editorName, editorInstance) => {
  return {
    type: SET_REF,
    editorName,
    editorInstance,
  };
};

export let updateEditorState = (editorName, editorState) => {
  return {
    type: UPDATE_EDITOR_STATE,
    editorName,
    editorState,
  };
};

export let toggleBlock = (editorName, blockName) => {
  return {
    type: TOGGLE_BLOCK,
    editorName,
    blockName,
  };
};

export let toggleStyle = (editorName, styleName) => {
  return {
    type: TOGGLE_STYLE,
    editorName,
    styleName,
  };
};
