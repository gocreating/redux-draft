import {
  INIT,
  SET_REF,
  UPDATE_EDITOR_STATE,
  UPDATE_READ_ONLY,
  TOGGLE_BLOCK,
  TOGGLE_STYLE,
  APPLY_BLOCK,
  REMOVE_ENTITY,
  APPLY_ENTITY,
  INSERT_ENTITY,
  INSERT_ATOMIC_BLOCK,
  UPDATE_ENTITY_DATA,
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

export let updateReadOnly = (editorName, readOnly) => {
  return {
    type: UPDATE_READ_ONLY,
    editorName,
    readOnly,
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

export let applyBlock = (editorName, blockName) => {
  return {
    type: APPLY_BLOCK,
    editorName,
    blockName,
  };
};

export let removeEntity = (editorName) => {
  return {
    type: REMOVE_ENTITY,
    editorName,
  };
};

export let applyEntity = (editorName, entityName, mutability, data) => {
  return {
    type: APPLY_ENTITY,
    editorName,
    entityName,
    mutability,
    data,
  };
};

export let insertEntity = (
  editorName, entityName, mutability, data, text = ' '
) => {
  return {
    type: INSERT_ENTITY,
    editorName,
    entityName,
    mutability,
    data,
    text,
  };
};

export let insertAtomicBlock = (
  editorName, entityName, mutability, data, text = ' '
) => {
  return {
    type: INSERT_ATOMIC_BLOCK,
    editorName,
    entityName,
    mutability,
    data,
    text,
  };
};

export let updateEntityData = (
  editorName, entityKey, data
) => {
  return {
    type: UPDATE_ENTITY_DATA,
    editorName,
    entityKey,
    data,
  };
};
