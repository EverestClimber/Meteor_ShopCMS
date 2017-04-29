import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import baseModel from '../base-model';

//declare collection name and export it
export const Documents = new Mongo.Collection('Documents');

//attach basics via baseModel (createdAt, title, etc.)
Documents.baseModel = baseModel;

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


Documents.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
  },
  content: {
    type: String,
    optional: true,
  },
  schemaVersion: {
    type: Number,
    autoValue: function() {
      // only set on insert
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return 0
        }
    }
  },
});



Documents.attachSchema(Documents.schema);
Documents.attachSchema(Documents.baseModel);