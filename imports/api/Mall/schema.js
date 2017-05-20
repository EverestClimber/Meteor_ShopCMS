import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shops } from './model';
import { Malls } from './model';
import { createError } from 'apollo-errors';
import { getLocationFromCoords, getLocationFromAddress } from '../api-helpers';
import { randomColor } from 'randomcolor'

const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});



const buildMall = async (root, args, context) => {

	let location;

	if (args.latitude && args.longitude) {
		location = await getLocationFromCoords(args.latitude, args.longitude);
	}

	if (!args.latitude && !args.longitude && args.location) {
		location = await getLocationFromAddress(args.location);
	}


	return new Promise(
	    (resolve, reject) => { // fat arrow
	    	let mall = {
			    title: args.title, 
			  	description: args.title,
			    location,
			    color_id: randomColor(),
			    numberOfStores: args.shopIds && args.shopIds.length || 0,
			    ownerId: context.user._id,
			    shopIds: args.shopIds || [],
			}
	    	resolve(mall)
	    }
	)
};





export const MallSchema = [`


type Mall {
	    _id: ID!
	    title: String!, 
	  	description: String!
	  	openDays: [String]
	    location: Address
	    numberOfStores: Int
	    owner: User
	    shops: [Shop]
	}

type Query {
	    mallById(_id: ID!): Mall,
	    mallsByOwner(string: String, offset: Int): [Mall],
    	malls(string: String, offset: Int): [Mall],
	  }

type Mutation {
	  # creates a new document 
	  # title is the document title
	  # content is the document content
	  createMall(
	    title: String!, 
	  	description: String!
	  	openDays: [String]
	    location: LocationData
	    shopIds: [ID]
	  ): Mall
	}

`];


export const MallResolvers = {
	Query: {
	    mallById: (root, args, context) => Shops.findOne({ _id: args._id }),
	    mallsByOwner: (root, args, context) => {
	    	if (!context.user) { return []; } // if no user exists in context, return an empty array
	    	let query = { ownerId: context.user._id }; //declare the query variable
	    	let options = { limit: 10, sort: { createdAt: -1 } } //set default options
	    	if (args && args.offset) { options.skip = args.offset } //if offset was passed, assign new offset value to query options
	    	if (!args || !args.string) {
	    		return Malls.find(query, options).fetch(); // if no search term exists, just return shops by ownerId
	    	}
	    	let regex = new RegExp( args.string, 'i' ); //create a regex for a fuzzy search
	    	query.title = regex; // if search term exists, add it to the query object 
	    	return Malls.find(query, options).fetch(); // then return the given query
	    },
	    malls: async (root, args, context) => {
	    	return Malls.find().fetch()
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
		async createMall(root, args, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}
			// TODO: check if record already exists
			//	check by a regex on title AND a query for lat/lng (maybe within X miles)
			let mall = await buildMall(root, args, context)
			let docId = Malls.insert(mall);
			if (docId) {
				return Malls.findOne({_id: docId});
			}

		},
	}
};

