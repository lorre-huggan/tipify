import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
