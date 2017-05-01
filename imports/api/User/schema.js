import { Random } from 'meteor/random';
import { SchemaMutations, SchemaTypes } from 'meteor-apollo-accounts'

export const UserSchema = [`

type Email {
  address: String
  verified: Boolean
}

type Name {
  first: String
  last: String
}

type Profile {
  name: Name
}

type User {
  emails: [Email]
  _id: String
  profile: Profile
  roles: [String]
}

type Query {
    user: User,
  }
  
`];


export const UserResolvers = {
	Query: {
    user(root, args, context) {
      return context.user;
    },
  },
  User: {
    _id: ({ _id }) => _id,
    emails: ({ emails }) => emails,
    roles: ({ roles }) => roles,
  },
};


