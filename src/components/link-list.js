import React from 'react';
import Link from './link';
import { compose, pure, branch, renderComponent, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LinkList = ({ links }) => {
  return (
    <div>
      {links.map(link => (
        <Link key={link.id} description={link.description} url={link.url} />
      ))}
    </div>
  );
};

const Loading = () => <div>Loading...</div>;

const Error = ({ data }) => (
  <div>
    <div>Error</div>
    <span>{data.error.message}</span>
  </div>
);

const displayLoadingState = branch(
  props => props.data.loading,
  renderComponent(Loading)
);

const handleError = branch(props => props.data.error, renderComponent(Error));

const data = graphql(gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`);

const enhance = compose(
  data,
  displayLoadingState,
  handleError,
  mapProps(({ data }) => {
    return { links: data.allLinks };
  }),
  pure
);

export default enhance(LinkList);
