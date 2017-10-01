import getEntityAtCursor from './getEntityAtCursor';

export default function isEntityActive(editorState, name) {
  let entityAtCursor = getEntityAtCursor(editorState);
  let entityKey = entityAtCursor && entityAtCursor.entityKey;
  let contentState = editorState.getCurrentContent();
  let entity = entityKey && contentState.getEntity(entityKey);

  return (entity != null && entity.type === name);
}
