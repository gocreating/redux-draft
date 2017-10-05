import React from 'react';
import BlockAtomic from '../draftComponents/Atomic/BlockAtomic';
import EntityLink from '../draftComponents/Link/EntityLink';
import Link from '../draftComponents/Link/Link';
import EntityImage from '../draftComponents/Image/EntityImage';
import DecoratorImage from '../draftComponents/Image/DecoratorImage';
import Image from 'react-bootstrap/lib/Image';
import linkStrategy from '../strategies/link';
import imageStrategy from '../strategies/image';

export default {
  name: 'BS',
  customBlockMap: {
    atomic: {
      component: BlockAtomic,
      props: {
        componentMap: {
          IMAGE: EntityImage,
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
  },
};
