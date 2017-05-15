import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel, addressSchema} from '../base-model';

export const Attachments = new Mongo.Collection('Attachments');

Attachments.baseModel = baseModel;

Attachments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Attachments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


Attachments.schema = new SimpleSchema({
  name: {// actual name of file
    type: String,
  },
  title:{// alternative title of file (given by user)
    type: String,
    optional: true
  },
  group: {//group is so you can group them, like on basecamp's file area
    type: String,
    optional: true
  },
  userId: {//group is so you can group them, like on basecamp's file area
    type: String,
    optional: true
  },
  fileType: {//pdf, .doc, png, etc.
    type: String,
    optional: true
  },
  modelType: {
    type: String, //type: image, dealSummary, operating statement, money yeilds, current rent role
    optional: true
  },
  url: {
    type: String,
  },
});

Attachments.attachSchema(Attachments.schema);
Attachments.attachSchema(Attachments.baseModel);