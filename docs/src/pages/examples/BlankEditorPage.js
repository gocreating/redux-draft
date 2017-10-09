import React, { Component } from 'react';
import { reduxDraft } from '../../../../lib';
import PageLayout from '../../utils/PageLayout';
import Preview from '../../editors/utils/Preview';
import Raw from '../../editors/utils/Raw';
import BlankEditor from '../../editors/BlankEditor/BlankEditor';
import draftConfig from '../../editors/BlankEditor/config';

class BlankEditorPage extends Component {
  render() {
    return (
      <PageLayout>
        <BlankEditor />
        <h2>Preview</h2>
        {React.createElement(reduxDraft(draftConfig)(Preview))}
        <h2>Raw</h2>
        {React.createElement(reduxDraft(draftConfig)(Raw))}
      </PageLayout>
    );
  }
}

export default BlankEditorPage;
