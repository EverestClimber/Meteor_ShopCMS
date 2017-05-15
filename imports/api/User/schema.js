import { Random } from 'meteor/random';
import { SchemaMutations, SchemaTypes, userId } from 'meteor-apollo-accounts';
import { Meteor } from 'meteor/meteor';
import { Documents } from '../Document/model'
import { check } from 'meteor/check';

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
  firstName: String
  lastName: String
  cell: String
  image: String
  expoPushId: String
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
    saveUserImage(image: String!): User
    saveUserExpoPushId(expoPushId: String!): User
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
    saveUserExpoPushId(root, { expoPushId }, { user }) {
      check(expoPushId, String);
      check(user, Object);
      check(user._id, String);
      let dataToUpdate = { $set: {'profile.expoPushId': expoPushId} }
      let docToupdate = { _id: user._id };
      return Meteor.users.update(docToupdate, dataToUpdate);
    },
    saveUserImage(root, { image }, { user }) {
      let dataToUpdate = { 'profile.image': image };
      Meteor.users.update({ _id: user._id }, { $set: dataToUpdate });
      return Meteor.users.findOne({ _id: user._id });
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


