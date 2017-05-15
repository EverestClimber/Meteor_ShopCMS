import gql from 'graphql-tag';



// FETCH_SHOPS
// ============================
export const FETCH_SHOPS = gql`
	query FetchShops {
		shops {
			_id
			title
			description
			category
			image
			location {
				lat
				lng
			}
		} 
	}
`;