import React from 'react';
import {
  pure,
  compose,
  withHandlers,
  withProps,
  defaultProps
} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import timeago from 'timeago.js';
import './link.css';

const timeSince = timestamp => timeago().format(timestamp);

const Link = ({
  index,
  description,
  url,
  onVote,
  votes,
  createdAgo,
  postedBy
}) => (
  <div className="flex mt2 items-start">
    <div className="flex items-center">
      <span className="gray">{index + 1}.</span>
      <button className="ml1 gray f11 bw0 bg-unset pointer" onClick={onVote}>
        ▲
      </button>
    </div>
    <div className="ml1">
      <div>
        {description} ({url})
      </div>
      <div className="f6 lh-copy gray">
        {votes.length} votes | by {postedBy ? postedBy.name : 'Unknown'}{' '}
        {createdAgo}
      </div>
    </div>
  </div>
);

const withMutation = graphql(gql`
  mutation createVoteMutation($linkId: ID!) {
    createVote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`);

const enhance = compose(
  defaultProps({
    votes: []
  }),
  withMutation,
  withProps(({ createdAt }) => ({
    createdAgo: timeSince(createdAt)
  })),
  withHandlers({
    onVote: ({ mutate, id: linkId, onAfterVote }) => async () =>
      await mutate({
        variables: { linkId },
        update: (store, { data: { createVote } }) =>
          onAfterVote && onAfterVote(store, { linkId, vote: createVote })
      })
  }),
  pure
);

export default enhance(Link);
