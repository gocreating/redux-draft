import {
  EditorState,
} from 'draft-js';
import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
} from '../constants/ActionTypes';

let initialEditorState = {};
let editorReducer = (state = initialEditorState, action) => {
  switch (action.type) {
    case INIT: {
      let { config } = action;
      let editorState = (
        action.editorState ||
        EditorState.createEmpty()
      );

      return {
        // private redux-draft props
        _instance: null,
        // public redux-draft props
        name: action.editorName,
        config,
        // draft props
        editorState,
      };
    }

    case SET_REF: {
      return {
        ...state,
        _instance: action.editorInstance,
      };
    }

    case UPDATE_EDITOR_STATE: {
      return {
        ...state,
        editorState: action.editorState,
      };
    }
  }
};

let initialState = {};

export default (state = initialState, action) => {
  let { editorName } = action;

  if (editorName) {
    return {
      ...state,
      [editorName]: editorReducer(state[editorName], action),
    };
  } else {
    return state;
  }
};
