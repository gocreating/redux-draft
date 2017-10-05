import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { reduxDraft } from '../../../../lib';
import PageLayout from '../../utils/PageLayout';
import Preview from '../../Preview';
import Raw from '../../Raw';
import BsEditor from '../../editors/BsEditor';
import bs from '../../presets/bs';

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
            {React.createElement(reduxDraft(bs)(Preview))}
          </Tab>
          <Tab eventKey={3} title="Raw">
            <br />
            {React.createElement(reduxDraft(bs)(Raw))}
          </Tab>
        </Tabs>
      </PageLayout>
    );
  }
}

export default BsEditorPage;
