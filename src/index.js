import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'tachyons/css/tachyons.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.graph.cool/simple/v1/cj9hf99wg4kon01113vspgmz1'
  }),
  cache: new InMemoryCache()
});

const WrappedApp = (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

render(WrappedApp, document.getElementById('root'));
registerServiceWorker();
