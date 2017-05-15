import geocoder from 'geocoder';
import { Email } from 'meteor/email';
import { appConfig } from '../modules/config';


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
		          state: response.results[0].address_components[5].short_name,
		          zip: response.results[0].address_components[7].short_name,
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
	    		title: args.title,
	    		description: args.description,
	    		category: args.category,
				ownerId: user._id,
				ownerName: `${user.profile.firstName} ${user.profile.lastName}`,
				image: args.image || null,
				location
			}
	    	resolve(report)
	    }
	)
};