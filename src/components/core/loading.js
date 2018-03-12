import React from 'react';
import { branch, renderComponent } from 'recompose';

const Loading = () => <div>Loading...</div>;

export const displayLoading = branch(
  props => props.data.loading,
  renderComponent(Loading)
);

export default Loading;
