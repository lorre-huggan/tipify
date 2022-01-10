import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './override.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
