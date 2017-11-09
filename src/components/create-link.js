import React from 'react';
import { graphql } from 'react-apollo';
import { compose, pure, withHandlers, withState } from 'recompose';
import gql from 'graphql-tag';

const CreateLinkForm = ({ createLink, url, setUrl, description, setDescription }) => {
  return (
    <div>
      <div className='flex flex-column mt3'>
        <input
          className='mb2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type='text'
          placeholder='A description for the link'
        />
        <input
          className='mb2'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type='text'
          placeholder='The URL for the link'
        />
      </div>
      <button
        onClick={() => createLink(url, description)}>
        Submit
        </button>
    </div>
  );
};
  
const withMutation = graphql(gql`
  mutation createLinkMutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url,
    ) {
      id
      createdAt
      url
      description
    }
  }
`);

const allowLinkCreation = compose(
  withState('url', 'setUrl', ''),
  withState('description', 'setDescription', '')
);

const enhance = compose(
  withMutation,
  allowLinkCreation,
  withHandlers({
    createLink: ({ mutate, history }) => {
      return async (url, description) => {
        await mutate({ variables: { description, url } });
        history.push('/');
      }  
    }
  }),
  pure
);

export default enhance(CreateLinkForm);
