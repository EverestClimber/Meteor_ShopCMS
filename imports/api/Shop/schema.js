import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shops } from './model';
import { createError } from 'apollo-errors';
import { buildShop } from '../api-helpers';


const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});

export const ShopSchema = [`

type Shop {
	    _id: ID!
	    title: String!, 
	  	description: String!
	  	category: String!
	  	image: String
	    location: Address
	    owner: User
	}

type Query {
	    shopById(_id: ID!): Shop,
    	shops: [Shop],
	  }

type Mutation {
	  # creates a new document 
	  # title is the document title
	  # content is the document content
	  createShop(
	  	title: String!, 
	  	description: String!
	  	category: String!
	  	image: String
	  	latitude: String
	  	longitude: String
	  ): Shop
	}

`];



export const ShopResolvers = {
	Query: {
	    shopById: (root, args, context) => Shops.findOne({ _id: args._id }),
	    shops: () => Shops.find().fetch(),
  	},
  	Shop: {
  		owner: ({ ownerId }, args, context) => {
  			let user = Meteor.users.findOne({_id: ownerId});
  			if (!user) { return null }
  			return user
  		}
  	},
	Mutation: {
		async createShop(root, args, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}

			let shop = await buildShop(args, context.user)
			console.log(shop)
			return {
				_id: 'fsdfsafsadfasfa'
			}
			/*args.ownerId = context.user._id;
			let docId = Shops.insert({...args});
			if (docId) {
				return Shops.findOne({_id: docId});
			}*/
		},
	}
};

