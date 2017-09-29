import {
  INIT,
  UPDATE_EDITOR_STATE,
} from '../constants/ActionTypes';

export let init = (editorName, config) => {
  return {
    type: INIT,
    editorName,
    config,
  };
};

export let updateEditorState = (editorName, editorState) => {
  return {
    type: UPDATE_EDITOR_STATE,
    editorName,
    editorState,
  };
};
