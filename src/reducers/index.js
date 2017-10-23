import { Map } from 'immutable';
import {
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  DefaultDraftInlineStyle,
  CompositeDecorator,
  Modifier,
  AtomicBlockUtils,
  SelectionState,
  convertFromRaw,
} from 'draft-js';
import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
  UPDATE_EDITOR_STATE_FROM_RAW,
  UPDATE_READ_ONLY,
  TOGGLE_BLOCK,
  TOGGLE_STYLE,
  APPLY_BLOCK,
  REMOVE_ENTITY,
  APPLY_ENTITY,
  INSERT_ENTITY,
  INSERT_ATOMIC_BLOCK,
  REMOVE_BLOCK,
  UPDATE_ENTITY_DATA,
} from '../constants/ActionTypes';
import isEntityActive from '../utils/isEntityActive';

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
  editorState, blockNames, styleNames, decoratorNames,
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
  let entityActiveMap = decoratorNames
    .reduce((map, decoratorName) => {
      map[decoratorName] = isEntityActive(editorState, decoratorName);
      return map;
    }, {});

  return {
    ...blockActiveMap,
    ...styleActiveMap,
    ...entityActiveMap,
  };
};

let initialEditorState = {};
let editorReducer = (state = initialEditorState, action) => {
  switch (action.type) {
    case INIT: {
      let { config, markInitialized } = action;
      let {
        rawContent,
        customStyleMap = {},
        customBlockMap = {},
        entityMap = {},
        decoratorMap = {},
        renderMap = {},
      } = config;
      let defaultStyleNames = Object.keys(DefaultDraftInlineStyle);
      let styleNames = [
        ...defaultStyleNames,
        ...Object.keys(customStyleMap || []),
      ];
      let defaultBlockNames = (
        DefaultDraftBlockRenderMap.keySeq().toArray()
      );
      let editorStateFromRaw = null;

      if (rawContent) {
        editorStateFromRaw = EditorState.createWithContent(
          convertFromRaw(rawContent)
        );
      }

      let editorState = (
        action.editorState ||
        editorStateFromRaw ||
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
      let entityNames = Object.keys(entityMap);
      let decoratorNames = Object.keys(decoratorMap);
      let decorators = (
        decoratorNames.map(decoratorName => decoratorMap[decoratorName])
      );

      editorState = EditorState.set(editorState, {
        decorator: new CompositeDecorator(decorators),
      });
      return {
        // private redux-draft props
        _instance: null,
        _initialized: markInitialized,

        // public redux-draft props
        name: action.editorName,
        config,
        defaultStyleNames,
        styleNames,
        defaultBlockNames,
        blockNames,
        entityNames,
        decoratorNames,
        decorators,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
        renderMap,

        // draft props
        editorState,
        customStyleMap,
        blockRenderMap,
        blockRendererFn,
        readOnly: false,
      };
    }

    case SET_REF: {
      return {
        ...state,
        _instance: action.editorInstance,
      };
    }

    case UPDATE_EDITOR_STATE: {
      let {
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
      let { editorState } = action;

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case UPDATE_EDITOR_STATE_FROM_RAW: {
      let {
        blockNames,
        styleNames,
        decoratorNames,
        decorators,
      } = state;
      let { rawContent } = action;
      let contentState = convertFromRaw(rawContent);
      let editorState = EditorState.createWithContent(
        contentState,
        new CompositeDecorator(decorators)
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case UPDATE_READ_ONLY: {
      return {
        ...state,
        readOnly: action.readOnly,
      };
    }

    case TOGGLE_BLOCK: {
      let {
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
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
          decoratorNames,
        }),
      };
    }

    case TOGGLE_STYLE: {
      let {
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
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
          decoratorNames,
        }),
      };
    }

    case APPLY_BLOCK: {
      let {
        editorState,
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
      let contentState = editorState.getCurrentContent();
      let selectionState = editorState.getSelection();
      let setBlock = Modifier.setBlockType(
        contentState,
        selectionState,
        action.blockName,
      );

      contentState = EditorState.push(
        editorState,
        setBlock,
        'change-block-type'
      );
      editorState = EditorState.forceSelection(
        contentState, setBlock.getSelectionAfter()
      );
      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case REMOVE_ENTITY: {
      let {
        editorState,
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
      let selectionState = editorState.getSelection();
      let contentState = editorState.getCurrentContent();
      let contentStateWithoutEntity = Modifier.applyEntity(
        contentState,
        selectionState,
        null
      );
      editorState = EditorState.push(
        editorState,
        contentStateWithoutEntity,
        'apply-entity'
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case APPLY_ENTITY: {
      let {
        editorState,
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
      let selectionState = editorState.getSelection();
      let contentState = editorState.getCurrentContent();

      let contentStateWithNewEntity = contentState.createEntity(
        action.entityName,
        action.mutability,
        action.data
      );
      let entityKey = contentStateWithNewEntity.getLastCreatedEntityKey();
      let contentStateWithEntity = Modifier.applyEntity(
        contentStateWithNewEntity,
        selectionState,
        entityKey
      );
      editorState = EditorState.push(
        editorState,
        contentStateWithEntity,
        'apply-entity'
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case INSERT_ENTITY: {
      let {
        editorState,
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
      let selectionState = editorState.getSelection();
      let contentState = editorState.getCurrentContent();

      let contentStateWithNewEntity = contentState.createEntity(
        action.entityName,
        action.mutability,
        action.data
      );
      let entityKey = contentStateWithNewEntity.getLastCreatedEntityKey();

      let firstBlank = Modifier.insertText(
        contentState,
        selectionState,
        ' ',
        null,
        null
      );
      let withEntity = Modifier.insertText(
        firstBlank,
        selectionState,
        action.text,
        null,
        entityKey
      );
      let withBlank = Modifier.insertText(
        withEntity,
        selectionState,
        ' ',
        null,
        null,
      );

      editorState = EditorState.push(
        editorState,
        withBlank,
        'insert-text'
      );

      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case INSERT_ATOMIC_BLOCK: {
      let {
        editorState,
        blockNames,
        styleNames,
        decoratorNames,
      } = state;
      let contentState = editorState.getCurrentContent();
      let contentStateWithNewEntity = contentState.createEntity(
        action.entityName,
        action.mutability,
        action.data
      );
      let entityKey = contentStateWithNewEntity.getLastCreatedEntityKey();

      editorState = EditorState.set(
        editorState,
        {currentContent: contentStateWithNewEntity},
      );
      editorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        action.text
      );
      return {
        ...state,
        editorState,
        activeMap: getActiveMap({
          editorState,
          blockNames,
          styleNames,
          decoratorNames,
        }),
      };
    }

    case REMOVE_BLOCK: {
      let { editorState } = state;
      let contentState = editorState.getCurrentContent();
      let block = contentState.getBlockForKey(action.blockKey);
      let targetRange = new SelectionState({
        anchorKey: action.blockKey,
        anchorOffset: 0,
        focusKey: action.blockKey,
        focusOffset: block.getLength(),
      });
      let withoutBlock = Modifier.removeRange(
        contentState,
        targetRange,
        'backward'
      );
      let resetBlock = Modifier.setBlockType(
        withoutBlock,
        withoutBlock.getSelectionAfter(),
        'unstyled',
      );

      contentState = EditorState.push(editorState, resetBlock, 'remove-range');
      editorState = EditorState.forceSelection(
        contentState, resetBlock.getSelectionAfter()
      );
      return {
        ...state,
        editorState,
      };
    }

    case UPDATE_ENTITY_DATA: {
      let { editorState, decorators } = state;
      let contentState = editorState.getCurrentContent();
      contentState = contentState.mergeEntityData(
        action.entityKey,
        action.data
      );
      editorState = EditorState.createWithContent(
        contentState,
        new CompositeDecorator(decorators)
      );

      return {
        ...state,
        editorState,
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
