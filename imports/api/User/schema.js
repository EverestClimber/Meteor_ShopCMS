import { Random } from 'meteor/random';
import { SchemaMutations, SchemaTypes, userId } from 'meteor-apollo-accounts';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const UserSchema = [`

type Email {
  address: String
  verified: Boolean
}

input CreateUserProfileInput {
  firstName: String
  lastName: String
  cell: String
  image: String
  expoPushId: String
}

type Profile {
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
}

type Query {
    user: User,
    users: [User],
    getUserById(_id: ID!): User,
  }

type Mutation {
    saveUserImage(image: String!): User
    saveUserExpoPushId(expoPushId: String!): User
    saveUserProfile (
      email: String!, 
      _id: ID
      firstName: String
      lastName: String
      image: String
    ): User
    # mutation for an admin to edit a users profile
    adminSaveUserProfile (
      _id: ID!
      email: String,
      firstName: String
      lastName: String
      image: String
      roles: [String]
    ): User
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
    adminSaveUserProfile(root, args, { user }) {
      if (!user || !user.roles.includes('admin')) { return; }
      let dataToUpdate = {
        'emails.0.address': args.email,
        roles: args.roles,
      }
      Meteor.users.update({ _id: args._id }, { $set: dataToUpdate }, (err, res) => {
        if (err) { return err }
        return Meteor.users.findOne({ _id: args._id });
      });
      
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
  },
};


