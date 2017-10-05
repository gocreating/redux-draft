import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import redraft from 'redraft';

let addBreaklines = (children) => {
  return children.map(child => [child, <br />]);
};

class Preview extends Component {
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
      unstyled: (children) => (
        children.map(child => (
          <p>
            {child}
          </p>
        ))
      ),
      'header-one': (children) => children.map(child =>
        <h1>{child}</h1>
      ),
      'header-two': (children) => children.map(child =>
        <h2>{child}</h2>
      ),
      'header-three': (children) => children.map(child =>
        <h3>{child}</h3>
      ),
      'header-four': (children) => children.map(child =>
        <h4>{child}</h4>
      ),
      'header-five': (children) => children.map(child =>
        <h5>{child}</h5>
      ),
      'header-six': (children) => children.map(child =>
        <h6>{child}</h6>
      ),
      blockquote: (children, { keys }) => (
        <blockquote key={keys[0]}>
          {addBreaklines(children)}
        </blockquote>
      ),
      'code-block': (children, { keys }) => (
        <pre key={keys[0]}>
          {addBreaklines(children)}
        </pre>
      ),
      'unordered-list-item': (children, { depth, keys }) => (
        <ul
          key={keys.join('-')}
          className={`ul-level-${depth}`}
        >
          {children.map((child, idx) => (
            <li key={keys[idx]}>{child}</li>
          ))}
        </ul>
      ),
      'ordered-list-item': (children, { depth, keys }) => (
        <ol
          key={keys.join('-')}
          className={`ol-level-${depth}`}
        >
          {children.map((child, idx) =>
            <li key={keys[idx]}>{child}</li>)}
        </ol>
      ),
    };
  }

  render() {
    let {
      editorState,
      customStyleMap,
      blockNames,
      styleNames,
      decoratorNames,
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
    let blockRenderer = blockNames.reduce(
      (map, blockName) => {
        map[blockName] = mergedRenderMap[blockName];
        return map;
      }, {}
    );
    let entityRenderer = decoratorNames.reduce(
      (map, decoratorName) => {
        map[decoratorName] = mergedRenderMap[decoratorName];
        return map;
      }, {}
    );
    let renderers = {
      inline: inlineRenderer,
      blocks: blockRenderer,
      entities: entityRenderer,
    };
    let rendered = redraft(rawContent, renderers);

    return (
      <div>
        {rendered}
      </div>
    );
  }
}

export default Preview;
