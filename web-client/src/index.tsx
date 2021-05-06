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
import { API_BASE_URL } from './config';

const GRAPHQL_ENDPOINT = '/graphql';

const httpLink = createUploadLink({
  uri: `${API_BASE_URL}${GRAPHQL_ENDPOINT}`,
});

const webSocketProtocolAndHost = API_BASE_URL?.startsWith('http')
  ? API_BASE_URL.replace('http', 'ws')
  : `${document.location.origin.replace('http', 'ws')}${API_BASE_URL}`;

const wsLink = new WebSocketLink({
  uri: `${webSocketProtocolAndHost}${GRAPHQL_ENDPOINT}`,
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
