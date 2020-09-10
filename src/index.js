import React from 'react';
import ReactDOM from 'react-dom';
import { 
  ApolloClient, HttpLink, InMemoryCache
} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import './index.css'
import App from './App'

const httpLink = new HttpLink({ 
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  shouldBatch: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);