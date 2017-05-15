import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Attachment } from './model';
import { createError } from 'apollo-errors';

const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});

export const AttachmentSchema = [`

type Attachment {
	    _id: ID!
	    title: String
	    owner: User
	}

type Query {
	    attachmentById(_id: ID!): Attachment,
    	attachments: [Attachment],
	  }

type Mutation {
	  # creates a new document 
	  # title is the document title
	  # content is the document content
	  createAttachment(title: String!, content: String!): Attachment
	}

`];



export const AttachmentResolvers = {
	Query: {
	    attachmentById: (root, args, context) => Attachments.findOne({ _id: args._id }),
	    attachments: () => Attachments.find().fetch(),
  	},
  	Shop: {
  		owner: ({ ownerId }, args, context) => {
  			let user = Meteor.users.findOne({_id: ownerId});
  			if (!user) { return null }
  			return user
  		}
  	},
	Mutation: {
		createAttachment(root, args, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}
			console.log(args)
			/*args.ownerId = context.user._id;
			let docId = Shops.insert({...args});
			if (docId) {
				return Shops.findOne({_id: docId});
			}*/
		},
	}
};

