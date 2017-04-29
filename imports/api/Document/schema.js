import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from './model';


export const DocumentSchema = [`

type Document {
	    _id: ID!
	    title: String
	    content: String
	}

type Query {
	    documentById(_id: ID!): Document,
    	documents: [Document],
	  }

type Mutation {
	  # creates a new document 
	  # title is the document title
	  # content is the document content
	  createDocument(title: String!, content: String!): Document
	}

`];

export const DocumentResolvers = {
	Query: {
	    documentById: (root, args, context) => {
	      return Documents.findOne({ _id: args._id });
	    },
	    documents: () => {
	      return Documents.find().fetch();
	    },
  	},
	Mutation: {
		createDocument(root, args, context) {
			args.ownerId = Random.id();
		},
	}
};



