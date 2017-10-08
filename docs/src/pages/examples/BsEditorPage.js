import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { reduxDraft } from '../../../../lib';
import PageLayout from '../../utils/PageLayout';
import Preview from '../../editors/utils/Preview';
import Raw from '../../editors/utils/Raw';
import BsEditor from '../../editors/BsEditor/BsEditor';
import draftConfig from '../../editors/BsEditor/config';

class BsEditorPage extends Component {
  render() {
    return (
      <PageLayout>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Helmet>
        <Tabs defaultActiveKey={1} id="bs-editor-tabs">
          <Tab eventKey={1} title="Editor">
            <br />
            <BsEditor />
          </Tab>
          <Tab eventKey={2} title="Preview">
            <br />
            {React.createElement(reduxDraft(draftConfig)(Preview))}
          </Tab>
          <Tab eventKey={3} title="Raw">
            <br />
            {React.createElement(reduxDraft(draftConfig)(Raw))}
          </Tab>
        </Tabs>
      </PageLayout>
    );
  }
}

export default BsEditorPage;
