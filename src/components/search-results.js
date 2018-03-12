import React from 'react';
import { pure, compose, mapProps, defaultProps } from 'recompose';
import Link from './link';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { displayLoading } from './loading';
import { displayError } from './error';

const SearchResults = ({ links }) => (
  <div>
    {links.map((link, index) => <Link key={link.id} index={index} {...link} />)}
  </div>
);

const LINKS_SEARCH_QUERY = gql`
  query createLinksSearch($filter: String!) {
    allLinks(
      filter: {
        OR: [{ description_contains: $filter }, { url_contains: $filter }]
      }
    ) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const isEmptyString = (value = '') =>
  Boolean(value) === false || value.trim() === '';

const enhance = compose(
  defaultProps({
    data: {}
  }),
  graphql(LINKS_SEARCH_QUERY, {
    skip: ({ filter }) => isEmptyString(filter),
    options: ({ filter }) => ({
      variables: { filter }
    })
  }),
  displayError,
  displayLoading,
  mapProps(({ data: { allLinks } }) => {
    return { links: allLinks || [] };
  }),
  pure
);

export default enhance(SearchResults);
