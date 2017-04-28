//top-level imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
//APOLLO SPECIFIC
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
//ROUTES
import AppRoutes  from './routes.js';
import { getLoginToken } from 'meteor-apollo-accounts';


const client = new ApolloClient(meteorClientConfig());


// INJECT MAIN APP
Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
  		<AppRoutes />
    </ApolloProvider>,
    document.getElementById('app')
  );
});
