import React from 'react';
import { compose, mapProps, defaultProps, onlyUpdateForKeys } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Link from '../core/link';
import { displayLoading } from '../core/loading';
import { displayError } from '../core/error';

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
  onlyUpdateForKeys(['filter'])
);

export default enhance(SearchResults);
