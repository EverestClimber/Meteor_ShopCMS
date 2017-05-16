import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shops } from './model';
import { createError } from 'apollo-errors';
import { buildShop } from '../api-helpers';


const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});


const getShopSearchResults = async (root, args, context) => {
	
	return new Promise(
	    (resolve, reject) => {

	    	let options = { limit: 10, sort: { createdAt: -1 } }
			if (args && args.offset) { options.skip = args.offset }
			if (!args || !args.string) {
				let shops = Shops.find({}, options).fetch();
				resolve(shops)
			}
			let regex = new RegExp( args.string, 'i' );
			let query = { $or: [
					{ title: regex },
					{ description: regex },
					{ category: regex },
					{ 'location.fullAddress': regex },
					{ 'location.city': regex },
					{ 'location.country': regex },
					{ 'location.street': regex }
				]
			}
	    	let shops = Shops.find(query, options).fetch();
	    	resolve(shops)
	    }
	)
};


export const ShopSchema = [`


type Shop {
	    _id: ID!
	    title: String!, 
	  	description: String!
	  	category: String!
	  	image: String
	  	phone: String
	  	website: String
	  	email: String
	  	contactName: String
	  	openDays: [String]
	    location: Address
	    owner: User
	}

type Query {
	    shopById(_id: ID!): Shop,
	    shopsByOwner(string: String, offset: Int): [Shop],
    	shops(string: String, offset: Int): [Shop],
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
	  	phone: String
	  	website: String
	  	email: String
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
	    	/*let options = { limit: 10, sort: { createdAt: -1 } }
	    	if (args && args.offset) { options.skip = args.offset }
	    	if (!args || !args.string) {
	    		return Shops.find({}, options).fetch();
	    	}
	    	let regex = new RegExp( args.string, 'i' );
	    	let query = { $or: [
	    			{ title: regex },
	    			{ description: regex },
	    			{ category: regex },
	    			{ 'location.fullAddress': regex }
	    		]
	    	}
	    	return Shops.find(query, options).fetch();*/
	    },
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
			let docId = Shops.insert(shop);
			if (docId) {
				return Shops.findOne({_id: docId});
			}
			/*args.ownerId = context.user._id;
			let docId = Shops.insert({...args});
			if (docId) {
				return Shops.findOne({_id: docId});
			}*/
		},
	}
};

