import {
  INIT,
  UPDATE_EDITOR_STATE,
} from '../constants/ActionTypes';

export let init = (editorName) => {
  return {
    type: INIT,
    editorName,
  };
};

export let updateEditorState = (editorName, editorState) => {
  return {
    type: UPDATE_EDITOR_STATE,
    editorName,
    editorState,
  };
};
