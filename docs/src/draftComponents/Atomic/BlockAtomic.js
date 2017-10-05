import React from 'react';

let BlockAtomic = (props) => {
  let { block, contentState, blockProps } = props;
  let { componentMap } = blockProps;
  let entityKey = block.getEntityAt(0);
  let entity = contentState.getEntity(entityKey);
  let type = entity.getType();

  return React.createElement(
    componentMap[type], {
      block,
      entityKey,
      contentState,
    }
  );
};

export default BlockAtomic;
