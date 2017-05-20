import geocoder from 'geocoder';
import { Email } from 'meteor/email';
import { appConfig } from '../modules/config';
import { Shops } from './Shop/model';

export const getShopSearchResults = async (root, args, context) => {
	
	return new Promise(
	    (resolve, reject) => {
	    	let query = {};
			let andQueryArray = [];
	    	let options = { limit: 10, sort: { createdAt: -1 } }

	    	// If an offset arguement is passed, add it as an option. 
	    	// offset is used for pagination/infinite loading if it ever gets added.
			if (args && args.offset) { options.skip = args.offset }

			// if no arguments were passed, just return all shops
			if (!args || (!args.string && (!args.categories || args.categories.length === 0 ) && !args.nearMe && !args.latitude && !args.longitude) ) {
				let shops = Shops.find(query, options).fetch();
				return resolve(shops)
			}
			
			// if a categories argument was passed add it to the andQueryArray
			// to be used in the $and query
			if (args.categories && args.categories.length > 0) {
				let categoryQuery = { category: { $in: args.categories } }
				andQueryArray.push(categoryQuery)
			}

			// If a search string was passed, then add search terms to the andQueryArray
			if (args.string) {
				let regex = new RegExp( args.string, 'i' );
				let orSearchQuery = { $or: [ 
					{ title: regex }, 
					{ description: regex },
					{ 'location.fullAddress': regex },
					{ 'location.city': regex },
					{ 'location.country': regex },
					{ 'location.street': regex }
				]};
				andQueryArray.push(orSearchQuery)
			}

			// If nearMe is marked true, and you were passed the lat/lng for the user,
			// then add a geo $near query to the andQueryArray
			if (args.nearMe && args.latitude && args.longitude) {
				let locationSelector = {
			        $near: {
			            $geometry: { 
			            	type: "Point", 
			            	coordinates: [ parseFloat(args.longitude), parseFloat(args.latitude) ] 
			            },
			            $maxDistance: 300000,
			            $minDistance: 0
			        }
			    };
				let geoQuery = { 'location.geometry': locationSelector }
				console.log(geoQuery)
				andQueryArray.push(geoQuery)
			}

			query = { $and: andQueryArray }
	    	let shops = Shops.find(query, options).fetch();
	    	resolve(shops)
	    }
	)
};


export const getLocationFromCoords = (latitude, longitude) => {
	let location = {};
	return new Promise(
	    (resolve, reject) => { // fat arrow
	    	geocoder.reverseGeocode( latitude, longitude, function ( err, { results } ) {
			  // do something with data
			 
			  location = {
		          fullAddress: results[0] && results[0].formatted_address || '',
		          lat: parseFloat(latitude),
		          lng: parseFloat(longitude),
		          geometry: {
		          	type: 'Point',
		          	coordinates: [ parseFloat(longitude), parseFloat(latitude)]
		          },
		          placeId: results[0] && results[0].place_id || '',
		          street_number: results[0] && results[0].address_components[0].short_name || '',
		          street: results[0] && results[0].address_components[1].short_name || '',
		          city: results[0] && results[0].address_components[3].short_name || '',
		          //state: response.results[0].address_components[5].short_name,
		          //zip: response.results[0].address_components[7].short_name,
		          country: results[0] && results[0].address_components[6].short_name || '',
		          maps_url: results.location && results.location.maps_url && results.location.maps_url || '',
		        }
			  resolve(location)
			});
	    	
	    }
	)
}

export const getLocationFromAddress = (locationArgs) => {
	let location = {};
	let stringToGeocode = `${locationArgs.street1 || ''} ${locationArgs.street2 || ''} ${locationArgs.suburb || ''} ${locationArgs.postal || ''} ${locationArgs.state || ''} ${locationArgs.country || ''}`
	return new Promise(
	    (resolve, reject) => { // fat arrow
	    	geocoder.geocode( stringToGeocode, function ( err, { results } ) {
			  // do something with data
			  location = {
		          fullAddress: results[0] && results[0].formatted_address || '',
		          lat: results[0].geometry.location.lat, //parseFloat(latitude),
		          lng: results[0].geometry.location.lng, //parseFloat(longitude),
		          geometry: {
		          	type: 'Point',
		          	coordinates: [ results[0].geometry.location.lng, results[0].geometry.location.lat]
		          },
		          placeId: results[0] && results[0].place_id || '',
		          street_number: results[0] && results[0].address_components[0].short_name || '',
		          street: results[0] && results[0].address_components[1].short_name || '',
		          city: results[0] && results[0].address_components[3].short_name || '',
		          //state: response.results[0].address_components[5].short_name,
		          //zip: response.results[0].address_components[7].short_name,
		          country: results[0] && results[0].address_components[6].short_name || '',
		          //maps_url: results.location && results.location.maps_url && results.location.maps_url || '',
		        }
			  resolve(location)
			});
	    	
	    }
	)
}


export const buildShop = async (args, user) => {

	let location;

	if (args.latitude && args.longitude) {
		location = await getLocationFromCoords(args.latitude, args.longitude);
	}

	if (!args.latitude && !args.longitude && args.location) {
		location = await getLocationFromAddress(args.location);
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