import React from 'react';
import Link from './Link';

let DecoratorLink = ({ contentState, entityKey, children }) => {
  let { url } = contentState.getEntity(entityKey).getData();

  return (
    <Link href={url}>{children}</Link>
  );
};

export default DecoratorLink;
