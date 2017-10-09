import React from 'react';
import Quote from './Quote';
import DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react';

let BlockQuote = (props) => (
  <Quote>
    <DraftEditorBlock {...props} />
  </Quote>
);

export default BlockQuote;
