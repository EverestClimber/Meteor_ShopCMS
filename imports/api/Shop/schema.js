import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shops } from './model';
import { Attachments } from '../Attachment/model';

import { createError } from 'apollo-errors';
import { buildShop, getShopSearchResults } from '../api-helpers';


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
	  	phone: String
	  	phone2: String
	  	website: String
	  	email: String
	  	contactName: String
	  	instagram: String
	  	facebook: String
	  	twitter: String
	  	youtube: String
	  	mallId: String
	  	openDays: [String]
	    location: Address
	    owner: User
	    attachments: [Attachment]
	}

type Query {
	    shopById(_id: ID!): Shop,
	    shopsByOwner(string: String, offset: Int): [Shop],
    	shops(
    		string: String, 
    		offset: Int,
    		categories: [String],
    		nearMe: Boolean
    		latitude: String
	  		longitude: String
    	): [Shop],
    	shopExists(
    		string: String, 
    		offset: Int,
    		categories: [String],
    		nearMe: Boolean
    		latitude: String
	  		longitude: String
    	): [Shop],
	  }

type Mutation {
	# deletes a shop 
	# shopId the unique id of the shop 
	deleteShop(shopId: ID!): Shop

	# creates a new shop 
	# title is the shopId title
	# description is the shop content
	# category is the category of the shops content
	# image is the main image for he shop
	createShop(
		title: String!, 
		description: String!
		category: String!
		image: String
		latitude: String
		longitude: String
		location: LocationData
		mallId: String
		phone: String
		phone2: String
		website: String
		email: String
		instagram: String
		facebook: String
		twitter: String
		youtube: String
		contactName: String
		openDays: [String]
	): Shop
}

`];


export const ShopResolvers = {
	Query: {
	    shopById: (root, args, context) => Shops.findOne({ _id: args._id }),
	    shopsByOwner: (root, args, context) => {
	    	if (!context.user) { return []; } // if no user exists in context, return an empty array
	    	let query = { ownerId: context.user._id }; //declare the query variable
	    	let options = { limit: 10, sort: { createdAt: -1 } } //set default options
	    	if (args && args.offset) { options.skip = args.offset } //if offset was passed, assign new offset value to query options
	    	if (!args || !args.string) {
	    		return Shops.find(query, options).fetch(); // if no search term exists, just return shops by ownerId
	    	}
	    	let regex = new RegExp( args.string, 'i' ); //create a regex for a fuzzy search
	    	query.title = regex; // if search term exists, add it to the query object 
	    	return Shops.find(query, options).fetch(); // then return the given query
	    },
	    shops: async (root, args, context) => {
	    	let shopsToReturn = await getShopSearchResults(root, args, context);
	    	return shopsToReturn
	    },
	    shopExists: async (root, args, context) => {
	    	// if there are no arguments passed from the AddShopForm, then do not return any possible matches
	    	if (!args || (!args.string && (!args.categories || args.categories.length === 0 ) && !args.nearMe && !args.latitude && !args.longitude) ) {
				return []
			}
	    	let shopsToReturn = await getShopSearchResults(root, args, context);
	    	return shopsToReturn
	    },
  	},
  	Shop: {
  		owner: ({ ownerId }, args, context) => {
  			let user = Meteor.users.findOne({_id: ownerId});
  			if (!user) { return null }
  			return user
  		},
  		attachments: ({ _id }, args, context) => {
  			let attachments = Attachments.find({ownerId: _id}).fetch();
  			if (!attachments || attachments.length === 0) { return [] }// if attahments does not exist or length of array is 0, just return an empty array
  			return attachments
  		}
  	},
	Mutation: {
		async createShop(root, args, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}
			// TODO: check if record already exists
			//	check by a regex on title AND a query for lat/lng (maybe within X miles)
			let shop = await buildShop(args, context.user)
			let docId = Shops.insert(shop);
			if (docId) {
				return Shops.findOne({_id: docId});
			}

		},
		async deleteShop(root, { shopId }, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}

			let shop = Shops.findOne({_id: shopId});

			if (!shop) {
				throw new FooError({ data: { authentication: 'shop does not exist!' } });
			}
			if ((context.user._id !== shop.ownerId) && !context.user.roles.includes('admin')) {
				throw new FooError({ data: { authentication: 'you must be the owner or an admin to delete this record!' } });
			}
			// TODO: check if record already exists
			//	check by a regex on title AND a query for lat/lng (maybe within X miles)
			Shops.remove({_id: shopId}, (err, response) => {
				return shopId;
			});

		},
	}
};

