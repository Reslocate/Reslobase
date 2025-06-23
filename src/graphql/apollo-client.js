import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import keycloak from '../auth/keycloak';

const httpLink = createHttpLink({
  uri: 'https://reslobase-hasura.159.69.188.164.nip.io/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = keycloak.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
