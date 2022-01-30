import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './gql/apollo/client';
import { UserProvider } from './context/user/userProvider';
import { userInitialState, userReducer } from './context/user/UserReducer.';
import { JobProvider } from './context/job/JobProvider';
import { jobInitialState, jobReducer } from './context/job/JobReducer.';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <UserProvider initialState={userInitialState} reducer={userReducer}>
      <JobProvider initialState={jobInitialState} reducer={jobReducer}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </JobProvider>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
