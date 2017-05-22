import gql from 'graphql-tag';

const shopFragment = gql`
  fragment shopFragment on Shop {
        _id
        title
        description
        categories
        image
        mallId
        attachments {
			_id
			url
		}
		owner {
			_id
			emails {
				address
			}
			profile {
				firstName
				lastName
				image
			}
		}
        location {
          lat
          lng
        }
    }
`;



export const GET_USER = gql`
	query getUserById($_id: ID!) {
		getUserById(_id: $_id) {
			_id
			emails { address, verified }
			roles
			profile { firstName, lastName }
		}
	}
`;

// FETCH_SHOP
// ============================
export const FETCH_SHOP = gql`
  query FetchShop($_id: ID!) {
    shopById(_id: $_id) {
     ...shopFragment
    } 
  }
  ${shopFragment}
`;



// FETCH_SHOPS
// ============================
export const FETCH_SHOPS = gql`
	query FetchShops {
		shops {
			_id
			title
			description
			categories
			image
			location {
				lat
				lng
			}
		} 
	}
`;

// FETCH_MALLS
// ============================
export const FETCH_MALLS = gql`
	query FetchMalls {
		malls {
			_id
			title
			description
			location {
				lat
				lng
			}
		} 
	}
`;

export const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      _id
    }
  }
`;