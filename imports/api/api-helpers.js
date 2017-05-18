import geocoder from 'geocoder';
import { Email } from 'meteor/email';
import { appConfig } from '../modules/config';
import { Shops } from './Shop/model';

export const getShopSearchResults = async (root, args, context) => {
	
	return new Promise(
	    (resolve, reject) => {
	    	let query = {};
	    	let categoryQuery;
			let orSearchQuery;
			let regex;
	    	let options = { limit: 10, sort: { createdAt: -1 } }

			if (args && args.offset) { options.skip = args.offset }

			// if no arguments were passed, just return all shops
			if (!args) {
				let shops = Shops.find(query, options).fetch();
				return resolve(shops)
			}
			
			
			// if a categories argument was passed but not search string, 
			// just build a query to search categories
			if (args.categories && args.categories.length > 0) {
				categoryQuery = { category: { $in: args.categories } }
				query = { $and: [ categoryQuery ] }
			}

			// if a categories argument was passed AND a search string was also passed, 
			// then build a query to search categories AND regex search by string
			// query must match a category AND at least one field being text searched
			if (args.categories && args.categories.length > 0 && args.string) {
				regex = new RegExp( args.string, 'i' );
				orSearchQuery = { $or: [ 
					{ title: regex }, 
					{ description: regex },
					{ 'location.fullAddress': regex },
					{ 'location.city': regex },
					{ 'location.country': regex },
					{ 'location.street': regex }
				]};
				query = { $and: [ categoryQuery, orSearchQuery] }
			}

			if (args.categories && args.categories.length > 0 && args.string && args.nearMe && args.latitude && args.longitude) {
				let locationSelector = {
			        $near: {
			            $geometry: { type: "Point", coordinates: [ args.latitude, args.longitude ] },
			            $maxDistance: 300000,
			            $minDistance: 0
			        }
			    };
				let geoQuery = { 'location.geometry': locationSelector } 
				query = { $and: [ categoryQuery, orSearchQuery, geoQuery ] }
			}

	    	let shops = Shops.find(query, options).fetch();
	    	resolve(shops)
	    }
	)
};


export const getLocation = (latitude, longitude) => {
	let location = {};
	return new Promise(
	    (resolve, reject) => { // fat arrow
	    	geocoder.reverseGeocode( latitude, longitude, function ( err, response ) {
			  // do something with data
			  location = {
		          fullAddress: response.results[0].formatted_address,
		          lat: latitude,
		          lng: longitude,
		          geometry: response.results[0].geometry,
		          placeId: response.results[0].place_id,
		          street_number: response.results[0].address_components[0].short_name,
		          street: response.results[0].address_components[1].short_name,
		          city: response.results[0].address_components[3].short_name,
		          //state: response.results[0].address_components[5].short_name,
		          //zip: response.results[0].address_components[7].short_name,
		          country: response.results[0].address_components[6].short_name,
		          //maps_url: data.location.maps_url,
		        }
			  resolve(location)
			});
	    	
	    }
	)
}


export const buildShop = async (args, user) => {

	let location;

	if (args.latitude && args.longitude) {
		location = await getLocation(args.latitude, args.longitude);
	}
	
	return new Promise(
	    (resolve, reject) => { // fat arrow
	    	let report = {
	    		title: args.title || null,
	    		description: args.description || null,
	    		category: args.category || null,
				ownerId: user._id,
				phone: user.phone,
				website: user.website,
				email: user.email,
				//ownerName: `${user.profile.firstName} ${user.profile.lastName}` || null,
				image: args.image || null,
				location
			}
	    	resolve(report)
	    }
	)
};