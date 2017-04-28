import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from '/imports/api/schema';
import {loadSchema, getSchema} from 'graphql-loader'
import {initAccounts} from 'meteor/nicolaslopezj:apollo-accounts'

const options = {}
// Load all accounts related resolvers and type definitions into graphql-loader
initAccounts(options)


// Load all your resolvers and type definitions into graphql-loader
loadSchema({typeDefs, resolvers})
const loadedSchema = getSchema()
// Gets all the resolvers and type definitions loaded in graphql-loader
const schema = makeExecutableSchema(loadedSchema)

//const executabelSchema = makeExecutableSchema(schema);

createApolloServer({
  schema,
});
