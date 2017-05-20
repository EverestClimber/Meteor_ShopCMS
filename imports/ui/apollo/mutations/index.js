import gql from 'graphql-tag';



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
	){
	  createShop(
	    title: $title
	    description: $description
	    category: $category
	    image: $image
	    longitude: $longitude
	    latitude: $latitude
	  ){
	    _id
	    owner {
	    	_id
	    }
	  }
	}
`