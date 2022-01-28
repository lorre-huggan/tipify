import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './gql/apollo/client';
import { UserProvider } from './context/user/userProvider';
import { userInitialState, userReducer } from './context/user/UserReducer.';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <UserProvider initialState={userInitialState} reducer={userReducer}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
