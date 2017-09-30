import { Map } from 'immutable';
import {
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  DefaultDraftInlineStyle,
} from 'draft-js';
import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
  TOGGLE_BLOCK,
  TOGGLE_STYLE,
} from '../constants/ActionTypes';

let getBlockRenderMap = (customBlockMap) => {
  let customBlockRenderMap = Map(Object
    .keys(customBlockMap)
    .reduce((map, blockName) => {
      map[blockName] = {
        element: 'div',
      };
      return map;
    }, {
      // 'paragraph': {
      //   element: 'div',
      // },
      'unstyled': {
        element: 'div',
      },
      'atomic': {
        element: 'div',
      },
    }));
  let mergedRenderMap = DefaultDraftBlockRenderMap
    .merge(customBlockRenderMap);

  return mergedRenderMap;
};

let getActiveMap = ({
  editorState, blockNames, styleNames,
}) => {
  let selectionState = editorState.getSelection();
  let currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selectionState.getStartKey())
    .getType();
  let currentStyleNames = editorState.getCurrentInlineStyle();
  let blockActiveMap = blockNames
    .reduce((map, blockName) => {
      map[blockName] = (
        blockName === currentBlockType
      );
      return map;
    }, {});
  let styleActiveMap = styleNames
    .reduce((map, styleName) => {
      map[styleName] = currentStyleNames.has(styleName);
      return map;
    }, {});

  return {
    ...blockActiveMap,
    ...styleActiveMap,
  };
};

let initialEditorState = {};
let editorReducer = (state = initialEditorState, action) => {
  switch (action.type) {
    case INIT: {
      let { config } = action;
      let {
        customStyleMap,
        customBlockMap,
        renderMap,
      } = config;
      let defaultStyleNames = Object.keys(DefaultDraftInlineStyle);
      let styleNames = [
        ...defaultStyleNames,
        ...Object.keys(customStyleMap || []),
      ];
      let defaultBlockNames = (
        DefaultDraftBlockRenderMap.keySeq().toArray()
      );

      let editorState = (
        action.editorState ||
        EditorState.createEmpty()
      );
      let blockRenderMap = getBlockRenderMap(customBlockMap);
      let blockRendererFn = (contentBlock) => {
        let name = contentBlock.getType();

        return customBlockMap[name];
      };
      let blockNames = (
        blockRenderMap.keySeq().toArray()
      );

      return {
        // private redux-draft props
        _instance: null,
        _initialized: true,

        // public redux-draft props
        name: action.editorName,
        config,
        defaultStyleNames,
        styleNames,
        defaultBlockNames,
        blockNames,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
        }),
        renderMap,

        // draft props
        editorState,
        customStyleMap,
        blockRenderMap,
        blockRendererFn,
      };
    }

    case SET_REF: {
      return {
        ...state,
        _instance: action.editorInstance,
      };
    }

    case UPDATE_EDITOR_STATE: {
      let { blockNames, styleNames } = state;
      let { editorState } = action;

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
        }),
      };
    }

    case TOGGLE_BLOCK: {
      let { blockNames, styleNames } = state;
      let editorState = RichUtils.toggleBlockType(
        state.editorState,
        action.blockName
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
        }),
      };
    }

    case TOGGLE_STYLE: {
      let { blockNames, styleNames } = state;
      let editorState = RichUtils.toggleInlineStyle(
        state.editorState,
        action.styleName
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
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
