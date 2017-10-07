import React from 'react';
import TeX from './TeX';

let DecoratorTeX = (props) => {
  let { math } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <TeX math={math} />
  );
};

export default DecoratorTeX;
