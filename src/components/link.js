import React from 'react';
import { pure } from 'recompose';

const Link = ({ description, url }) => {
  return (
    <div>
      <div>{description} ({url})</div>
    </div>
  )
};

export default pure(Link);