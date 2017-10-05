import React from 'react';
import Header from './Header';
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react';

let BlockHeader = ({
  blockProps: { level = 1 }, ...rest
}) => (
  <Header level={level}>
    <DraftEditorBlock {...rest} />
  </Header>
);

export default BlockHeader;
