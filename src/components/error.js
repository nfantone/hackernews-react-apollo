import React from 'react';
import { branch, renderComponent } from 'recompose';

const Error = ({ data }) => (
  <div>
    <div>Error</div>
    <span>{data.error.message}</span>
  </div>
);

export const displayError = branch(
  props => props.data.error,
  renderComponent(Error)
);

export default Error;
