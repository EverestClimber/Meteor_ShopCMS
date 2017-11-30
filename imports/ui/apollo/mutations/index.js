import gql from 'graphql-tag';

export const CREATE_SHOP = gql`
	mutation CreateShop( $params: ShopParams ){
	  createShop( params: $params ){
	    _id
	    owner {
	    	_id
	    }
	  }
	}
`

export const SAVE_SHOP = gql`
	mutation SaveShop( 
		$_id: ID!, 
		$params: ShopParams 
	){
		saveShop( 
			_id: $_id, 
			params: $params 
	){
			_id
			owner {
				_id
			}
		}
	}
`

export const DELETE_SHOP = gql`
mutation DeleteShop ($shopId:ID!) {
	deleteShop(_id:$shopId) {
		_id
	}
}
`

export const CREATE_MALL = gql`
	mutation CreateMall (
				$title: String!
				$description: String!
				$openDays: [String]
				$lat: String
				$lng: String
				$shopIds: [ID]
	) {
		createMall(
				title: $title
				description: $description
				openDays: $openDays
				lat: $lat
				lng: $lng
				shopIds: $shopIds
		) {
			_id
		}
	}
`

export const SAVE_MALL = gql`
mutation SaveMall(
	$_id: ID!, 
	$title: String!,
	$description: String!,
	$openDays: [String],
	$lat: String,
	$lng: String,
	$shopIds: [ID]
){
	saveMall(
		_id: $_id, 
		title: $title,
		description: $description,
		openDays: $openDays,
		shopIds: $shopIds
		lat: $lat,
		lng: $lng
 ){
		_id
	}
}
`

export const DELETE_MALL = gql`
mutation DeleteMall( $mallId: ID!) {
	deleteMall(_id:$mallId) {
		_id
	}
}
`

export const ADMIN_SAVE_USERPROFILE = gql`
mutation AdminSaveUserProfile (
	$_id: ID!
	$email: String
	$firstName: String
	$lastName: String
	$cell: String
	$roles: [String]
	){
	adminSaveUserProfile (
		_id: $_id
		email: $email
		name: $name
		cell: $cell
		roles:  $roles
	){
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