import React from 'react';

let EditorLink = (props) => {
  let { url } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <a href={url}>{props.children}</a>
  );
};

export default EditorLink;
