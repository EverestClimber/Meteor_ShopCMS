import { Random } from 'meteor/random';
import { SchemaMutations, SchemaTypes, userId } from 'meteor-apollo-accounts';
import { Meteor } from 'meteor/meteor';
import { Documents } from '../Document/model'


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
  documents: [Document]
}

type Query {
    user: User,
    users: [User],
    getUserById(_id: ID!): User,
  }

type Mutation {
    saveUserProfile(email: String!, _id: ID!): User
  }

`];



export const UserResolvers = {
	Query: {
    user(root, args, context) {
      return context.user;
    },
    users(root, args, context) {
      return Meteor.users.find().fetch();
    },
    getUserById(root, { _id }, context) {
      return Meteor.users.findOne({ _id });
    },
  },
  Mutation:{
    saveUserProfile(root, { _id, email }, context) {
      let dataToUpdate = { 'emails.0.address': email }
      Meteor.users.update({ _id: _id }, { $set: dataToUpdate });
      return Meteor.users.findOne({ _id });
    },
  },
  User: {
    _id: ({ _id }) => _id,
    emails: ({ emails }) => emails,
    roles: ({ roles }) => roles,
    documents: ({ _id }) => {
      return Documents.find({ownerId: _id}).fetch()
    }
  },
};


