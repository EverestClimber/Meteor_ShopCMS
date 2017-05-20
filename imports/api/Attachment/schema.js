import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Attachments } from './model';
import { Shops } from '../Shop/model';
import { createError } from 'apollo-errors';

const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});


export const AttachmentSchema = [`



type Attachment {
	    _id: ID!
	    title: String
	    url: String
	    shopId: ID
	    userId: ID
	    owner: User
	    shop: Shop
	}

type Query {
	    attachmentById(_id: ID!): Attachment,
    	attachments: [Attachment],
	  }

type Mutation {
	  # creates a new document 
	  # title is the document title
	  # content is the document content
	  addAttachments(
	  	images: [ImageObject], 
	  	shopId: ID, 
	  	userId: ID,
	  ): Attachment
	}

`];



export const AttachmentResolvers = {
	Query: {
	    attachmentById: (root, args, context) => Attachments.findOne({ _id: args._id }),
	    attachments: () => Attachments.find().fetch(),
  	},
  	Attachment: {
  		owner: ({ userId }, args, context) => {
  			let user = Meteor.users.findOne({_id: userId});
  			if (!user) { return null }
  			return user
  		},
  		shop: ({ shopId }, args, context) => {
  			let shop = Shops.findOne({shopId: shopId});
  			if (!shop) { return null }
  			return shop
  		}
  	},
	Mutation: {
		addAttachments(root, args, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}

			let imagesToInsert = args.images.map( item => {
				let image = {
					shopId: args.shopId,
					userId: args.userId,
					url: item.url,
					ownerId: context.user._id,
					name: item.name && item.name || '',
					fileType: item.fileType && item.fileType || '',
				}
				return image
			});
			console.log(imagesToInsert)
			imagesToInsert.forEach( imageDoc => {
				Attachments.insert(imageDoc)
			});
		},
	}
};

