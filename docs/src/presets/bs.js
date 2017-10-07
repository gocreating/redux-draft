import React from 'react';
import BlockAtomic from '../draftComponents/Atomic/BlockAtomic';
import EntityLink from '../draftComponents/Link/EntityLink';
import Link from '../draftComponents/Link/Link';
import EntityImage from '../draftComponents/Image/EntityImage';
import DecoratorImage from '../draftComponents/Image/DecoratorImage';
import Image from 'react-bootstrap/lib/Image';
import EntityTeX from '../draftComponents/TeX/EntityTeX';
import DecoratorTeX from '../draftComponents/TeX/DecoratorTeX';
import TeX from '../draftComponents/TeX/TeX';
import linkStrategy from '../strategies/link';
import imageStrategy from '../strategies/image';
import texStrategy from '../strategies/tex';

export default {
  name: 'BS',
  customBlockMap: {
    atomic: {
      component: BlockAtomic,
      props: {
        componentMap: {
          IMAGE: EntityImage,
          TEX: EntityTeX,
        },
      },
      editable: false,
    },
  },
  customStyleMap: {
    CODE: {
      padding: '2px 4px',
      fontSize: '90%',
      color: '#c7254e',
      backgroundColor: '#f9f2f4',
      borderRadius: '4px',
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
    TEX: {
      strategy: texStrategy,
      component: DecoratorTeX,
    },
  },
  renderMap: {
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
        thumbnail
      />
    ),
    TEX: (children, data, { key }) => (
      <TeX
        key={key}
        math={data.math}
      />
    ),
  },
};
