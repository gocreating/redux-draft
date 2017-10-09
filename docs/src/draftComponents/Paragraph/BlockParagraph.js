import React from 'react';
import Paragraph from './Paragraph';
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react';

let BlockParagraph = (props) => (
  <Paragraph>
    <DraftEditorBlock {...props} />
  </Paragraph>
);

export default BlockParagraph;
