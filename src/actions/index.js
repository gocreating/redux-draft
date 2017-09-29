import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
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
