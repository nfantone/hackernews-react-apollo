import React from 'react';
import { graphql } from 'react-apollo';
import { compose, pure, withHandlers, withState } from 'recompose';
import gql from 'graphql-tag';

const CreateLinkForm = ({
  createLink,
  url,
  setUrl,
  description,
  onDescriptionChange,
  onURLChange
}) => {
  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={onDescriptionChange}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={onURLChange}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={createLink}>Submit</button>
    </div>
  );
};

const withMutation = graphql(gql`
  mutation createLinkMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`);

const allowLinkCreation = compose(
  withState('url', 'setURL', ''),
  withState('description', 'setDescription', '')
);

const enhance = compose(
  withMutation,
  allowLinkCreation,
  withHandlers({
    onDescriptionChange: ({ setDescription }) => e =>
      setDescription(e.currentTarget.value),
    onURLChange: ({ setURL }) => e => setURL(e.target.value),
    createLink: ({ mutate, history, url, description }) => {
      return async () => {
        await mutate({ variables: { description, url } });
        history.push('/');
      };
    }
  }),
  pure
);

export default enhance(CreateLinkForm);
