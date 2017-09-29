import {
  EditorState,
  RichUtils,
  DefaultDraftInlineStyle,
} from 'draft-js';
import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
  TOGGLE_STYLE,
} from '../constants/ActionTypes';

let getActiveMap = ({ editorState, _styleNames }) => {
  let currentStyleNames = editorState.getCurrentInlineStyle();
  let activeMap = _styleNames
    .reduce((map, styleName) => {
      map[styleName] = currentStyleNames.has(styleName);
      return map;
    }, {});

  return activeMap;
};

let initialEditorState = {};
let editorReducer = (state = initialEditorState, action) => {
  switch (action.type) {
    case INIT: {
      let { config } = action;
      let _styleNames = [
        ...Object.keys(DefaultDraftInlineStyle),
        ...Object.keys(config.customStyleMap),
      ];
      let editorState = (
        action.editorState ||
        EditorState.createEmpty()
      );

      return {
        // private redux-draft props
        _instance: null,
        _styleNames,

        // public redux-draft props
        name: action.editorName,
        config,
        activeMap: getActiveMap({
          editorState,
          _styleNames,
        }),

        // draft props
        editorState,
        customStyleMap: config.customStyleMap,
      };
    }

    case SET_REF: {
      return {
        ...state,
        _instance: action.editorInstance,
      };
    }

    case UPDATE_EDITOR_STATE: {
      let { _styleNames } = state;
      let { editorState } = action;

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          _styleNames,
        }),
      };
    }

    case TOGGLE_STYLE: {
      let { _styleNames } = state;
      let editorState = RichUtils.toggleInlineStyle(
        state.editorState,
        action.styleName
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          _styleNames,
        }),
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
