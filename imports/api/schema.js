import { Random } from 'meteor/random';
import { UserResolvers, UserSchema } from './User';
import { DocumentResolvers, DocumentSchema } from './Document';
import { merge } from 'lodash';


export const typeDefs = [
	...UserSchema, 
	...DocumentSchema
];


export const resolvers = merge(
	UserResolvers, 
	DocumentResolvers
);


