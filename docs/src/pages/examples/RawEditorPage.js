import React, { Component } from 'react';
import { reduxDraft } from '../../../../lib';
import PageLayout from '../../utils/PageLayout';
import Preview from '../../editors/utils/Preview';
import Raw from '../../editors/utils/Raw';
import RawEditor from '../../editors/RawEditor/RawEditor';
import draftConfig from '../../editors/RawEditor/config';

class RawEditorPage extends Component {
  render() {
    return (
      <PageLayout>
        <RawEditor />
        <h2>Preview</h2>
        {React.createElement(reduxDraft(draftConfig)(Preview))}
        <h2>Raw</h2>
        {React.createElement(reduxDraft(draftConfig)(Raw))}
      </PageLayout>
    );
  }
}

export default RawEditorPage;
