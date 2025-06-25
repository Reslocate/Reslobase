import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createApolloClient } from '@nhost/apollo';
import nhost from '../nhost-config';

// Create Apollo Client with Nhost integration
const client = createApolloClient({
  nhost,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add any specific cache policies here
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: true,
});

export default client;