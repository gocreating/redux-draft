import React from 'react';

let EntityLink = (props) => {
  let { url } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <a href={url}>{props.children}</a>
  );
};

export default EntityLink;
