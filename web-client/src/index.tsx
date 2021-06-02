import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';

const GRAPHQL_ENDPOINT = '/graphql';

const httpLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include',
});

const webSocketProtocolAndHost = `${document.location.origin.replace(
  'http',
  'ws'
)}${GRAPHQL_ENDPOINT}`;

const wsLink = new WebSocketLink({
  uri: webSocketProtocolAndHost,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
