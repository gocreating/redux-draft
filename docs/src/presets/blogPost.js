import React from 'react';
import BlockHeader from '../draftComponents/Header/BlockHeader';
import Header from '../draftComponents/Header/Header';
import EntityLink from '../draftComponents/Link/EntityLink';
import Link from '../draftComponents/Link/Link';
import DecoratorImage from '../draftComponents/Image/DecoratorImage';
import Image from '../draftComponents/Image/Image';
import linkStrategy from '../strategies/link';
import imageStrategy from '../strategies/image';

export default {
  name: 'BLOG_POST',
  customBlockMap: {
    HEADER_LEVEL_1: {
      component: BlockHeader,
      props: { level: 1 },
      editable: true,
    },
    HEADER_LEVEL_2: {
      component: BlockHeader,
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
      component: EntityLink,
    },
    IMAGE: {
      strategy: imageStrategy,
      component: DecoratorImage,
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
      <Link
        key={key}
        href={data.url}
      >
        {children}
      </Link>
    ),
    IMAGE: (children, data, { key }) => (
      <Image
        key={key}
        alt=""
        src={data.src}
      />
    ),
  },
};
