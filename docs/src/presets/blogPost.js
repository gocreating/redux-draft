import React from 'react';
import EditorHeader from '../blockComponents/Header/EditorHeader';
import Header from '../blockComponents/Header/Header';
import EditorLink from '../decoratorComponents/Link/EditorLink';
import EditorImage from '../decoratorComponents/Image/EditorImage';
import linkStrategy from '../strategies/link';
import imageStrategy from '../strategies/image';

export default {
  name: 'BLOG_POST',
  customBlockMap: {
    HEADER_LEVEL_1: {
      component: EditorHeader,
      props: { level: 1 },
      editable: true,
    },
    HEADER_LEVEL_2: {
      component: EditorHeader,
      props: { level: 2 },
      editable: true,
    },
  },
  customStyleMap: {
    COLOR_RED: {
      color: 'red',
    },
    CUSTOM_CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      padding: 2,
    },
  },
  decoratorMap: {
    LINK: {
      strategy: linkStrategy,
      component: EditorLink,
    },
    IMAGE: {
      strategy: imageStrategy,
      component: EditorImage,
    },
  },
  renderMap: {
    // BOLD: (children, { key }) => (
    //   <strong key={key}>
    //     {children}
    //   </strong>
    // ),
    // ITALIC: (children, { key }) => (
    //   <em key={key}>
    //     {children}
    //   </em>
    // ),
    // UNDERLINE: (children, { key }) => (
    //   <u key={key}>
    //     {children}
    //   </u>
    // ),
    // STRIKETHROUGH: (children, { key }) => (
    //   <s key={key}>
    //     {children}
    //   </s>
    // ),
    // CODE: (children, { key }) => (
    //   <code key={key}>
    //     {children}
    //   </code>
    // ),
    // unstyled: (children) => (
    //   children.map(child => (
    //     <p>
    //       {child}
    //     </p>
    //   ))
    // ),
    // 'header-one': (children) => children.map(child =>
    //   <h1>{child}</h1>
    // ),
    // 'header-two': (children) => children.map(child =>
    //   <h2>{child}</h2>
    // ),
    // 'header-three': (children) => children.map(child =>
    //   <h3>{child}</h3>
    // ),
    // 'header-four': (children) => children.map(child =>
    //   <h4>{child}</h4>
    // ),
    // 'header-five': (children) => children.map(child =>
    //   <h5>{child}</h5>
    // ),
    // 'header-six': (children) => children.map(child =>
    //   <h6>{child}</h6>
    // ),
    // blockquote: (children, { keys }) => (
    //   <blockquote key={keys[0]}>
    //     {addBreaklines(children)}
    //   </blockquote>
    // ),
    // 'code-block': (children, { keys }) => (
    //   <pre key={keys[0]}>
    //     {addBreaklines(children)}
    //   </pre>
    // ),
    // 'unordered-list-item': (children, { depth, keys }) => (
    //   <ul
    //     key={keys.join('-')}
    //     className={`ul-level-${depth}`}
    //   >
    //     {children.map((child, idx) => (
    //       <li key={keys[idx]}>{child}</li>
    //     ))}
    //   </ul>
    // ),
    // 'ordered-list-item': (children, { depth, keys }) => (
    //   <ol
    //     key={keys.join('-')}
    //     className={`ol-level-${depth}`}
    //   >
    //     {children.map((child, idx) =>
    //       <li key={keys[idx]}>{child}</li>)}
    //   </ol>
    // ),
    HEADER_LEVEL_1: (children) => children.map(child =>
      <Header level={1}>
        {child}
      </Header>
    ),
    HEADER_LEVEL_2: (children) => children.map(child =>
      <Header level={2}>
        {child}
      </Header>
    ),
    LINK: (children, data, { key }) => (
      <a
        key={key}
        href={data.url}
      >
        {children}
      </a>
    ),
    IMAGE: (children, data, { key }) => (
      <img
        key={key}
        alt=""
        src={data.src}
      />
    ),
  },
};
