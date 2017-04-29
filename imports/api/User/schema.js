import { Random } from 'meteor/random';


export const UserSchema = [
  `
type Email {
  address: String
  verified: Boolean
}

type User {
  emails: [Email]
  randomString: String
  _id: String
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
    emails: ({ emails }) => emails,
    roles: ({ roles }) => roles,
  },
};


