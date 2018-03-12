import React from 'react';
import { compose, pure, mapProps, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from '../core/link';
import { displayLoading } from '../core/loading';
import { displayError } from '../core/error';

const LinkList = ({ links, onAfterVote }) => {
  return (
    <div>
      {links.map((link, index) => (
        <Link key={link.id} index={index} onAfterVote={onAfterVote} {...link} />
      ))}
    </div>
  );
};

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
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

const byLinkId = id => link => link.id === id;

const enhance = compose(
  graphql(ALL_LINKS_QUERY),
  displayLoading,
  displayError,
  mapProps(({ data }) => {
    return { links: data.allLinks };
  }),
  withHandlers({
    onAfterVote: () => (store, { linkId, vote }) => {
      const data = store.readQuery({ query: ALL_LINKS_QUERY });
      const votedLink = data.allLinks.find(byLinkId(linkId));
      votedLink.votes = vote.link.votes;
      store.writeQuery({ query: ALL_LINKS_QUERY, data });
    }
  }),
  pure
);

export default enhance(LinkList);
