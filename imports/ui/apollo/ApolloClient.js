//APOLLO SPECIFIC
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
import { Meteor } from 'meteor/meteor'



const networkInterface = { 
	useMeteorAccounts: true,
}

const client = new ApolloClient(meteorClientConfig());



export default client;