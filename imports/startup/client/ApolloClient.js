//APOLLO SPECIFIC
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient(meteorClientConfig());

export default client;