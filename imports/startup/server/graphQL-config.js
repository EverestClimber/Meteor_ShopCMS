import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from '/imports/api/schema';
//import { UserSchema} from '/imports/api/User';
import {loadSchema, getSchema} from 'graphql-loader'
import {initAccounts} from 'meteor/nicolaslopezj:apollo-accounts'

//set options
// Load all accounts related resolvers and type definitions into graphql-loader
initAccounts({});

// Load all your resolvers and type definitions into graphql-loader
loadSchema({typeDefs, resolvers});

// Gets all the resolvers and type definitions loaded in graphql-loader
const schema = makeExecutableSchema(getSchema());

//create server
createApolloServer({ schema });
