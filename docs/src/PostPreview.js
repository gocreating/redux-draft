import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import redraft from 'redraft';
import { reduxDraft } from '../../lib';
import blogPost from './presets/blogPost';

class PostPreview extends Component {
  renderWarning() {
    return (
      <div>
        Nothing to render.
      </div>
    );
  }

  getDefaultRenderMap() {
    return {
      BOLD: (children, { key }) => (
        <strong key={key}>
          {children}
        </strong>
      ),
      ITALIC: (children, { key }) => (
        <em key={key}>
          {children}
        </em>
      ),
      UNDERLINE: (children, { key }) => (
        <u key={key}>
          {children}
        </u>
      ),
      STRIKETHROUGH: (children, { key }) => (
        <s key={key}>
          {children}
        </s>
      ),
      CODE: (children, { key }) => (
        <code key={key}>
          {children}
        </code>
      ),
    };
  }

  render() {
    let {
      editorState,
      customStyleMap,
      styleNames,
      renderMap,
    } = this.props;
    let contentState = editorState.getCurrentContent();
    let rawContent = convertToRaw(contentState);

    if (!rawContent) {
      return this.renderWarning();
    }

    let mergedRenderMap = {
      ...this.getDefaultRenderMap(),
      ...renderMap,
    };
    let inlineRenderer = styleNames.reduce(
      (map, styleName) => {
        let renderer = mergedRenderMap[styleName];
        let customStyle = customStyleMap[styleName];

        if (renderer && !customStyle) {
          map[styleName] = renderer;
        } else {
          map[styleName] = (children, { key }) => (
            <span
              key={key}
              style={customStyle}
            >
              {children}
            </span>
          );
        }
        return map;
      }, {}
    );
    let renderers = {
      inline: inlineRenderer,
    };
    let rendered = redraft(rawContent, renderers);

    return (
      <div>
        {rendered}
      </div>
    );
  }
}

export default reduxDraft(blogPost)(PostPreview);
