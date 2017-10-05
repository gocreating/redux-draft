import React from 'react';
import Image from './Image';

let DecoratorImage = (props) => {
  let { src } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <Image
      alt=""
      src={src}
    />
  );
};

export default DecoratorImage;
