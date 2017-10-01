import React from 'react';

let EditorImage = (props) => {
  let { src } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <img
      alt=""
      src={src}
    />
  );
};

export default EditorImage;
