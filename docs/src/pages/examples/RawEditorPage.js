import React, { Component } from 'react';
import { reduxDraft } from '../../../../lib';
import PageLayout from '../../utils/PageLayout';
import Preview from '../../Preview';
import Raw from '../../Raw';
import RawEditor from '../../editors/RawEditor';
import raw from '../../presets/raw';

class RawEditorPage extends Component {
  render() {
    return (
      <PageLayout>
        <RawEditor />
        <h2>Preview</h2>
        {React.createElement(reduxDraft(raw)(Preview))}
        <h2>Raw</h2>
        {React.createElement(reduxDraft(raw)(Raw))}
      </PageLayout>
    );
  }
}

export default RawEditorPage;
