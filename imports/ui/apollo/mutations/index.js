import gql from 'graphql-tag';



export const DELETE_SHOP = gql`
	mutation DeleteShop ($shopId:ID!) {
	  deleteShop(shopId:$shopId) {
	    _id
	  }
	}
`

export const CREATE_MALL = gql`
	mutation CreateMall (
	  		$title: String!, 
		  	$description: String!
		    $location: LocationData
		    $shopIds: [ID]
	) {
	  createMall(
	    	title: $title, 
		  	description: $description
		    location: $location
		    shopIds: $shopIds
	  ) {
	    _id
	  }
	}
`




export const ADD_ATTACHMENTS = gql`
	mutation AddAttachments(
	  	$images: [ImageObject], 
	  	$shopId: ID, 
	  	$userId: ID,
	){
	  addAttachments(
	    images: $images, 
	  	shopId: $shopId, 
	  	userId: $userId,
	  ){
	    _id
	  }
	}
`

export const CREATE_SHOP = gql`
	mutation CreateShop(
	  $title: String!
	  $description: String!
	  $category: String!
	  $image: String
	  $longitude:String
	  $latitude: String
	  $location: LocationData
	){
	  createShop(
	    title: $title
	    description: $description
	    category: $category
	    image: $image
	    longitude: $longitude
	    latitude: $latitude
	    location: $location
	  ){
	    _id
	    owner {
	    	_id
	    }
	  }
	}
`