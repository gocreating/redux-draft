let strategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    let entityKey = character.getEntity();

    return (
      entityKey != null &&
      contentState.getEntity(entityKey).getType() === 'IMAGE'
    );
  }, callback);
};

export default strategy;
