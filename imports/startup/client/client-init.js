//top-level imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
//APOLLO SPECIFIC
import ApolloClient from '../../ui/apollo/ApolloClient'
import { ApolloProvider } from 'react-apollo';
//ROUTES
import AppRoutes  from './routes.js';

// INJECT MAIN APP
Meteor.startup(() => {
  render(
    <ApolloProvider client={ApolloClient}>
  		<AppRoutes />
    </ApolloProvider>,
    document.getElementById('app')
  );
});