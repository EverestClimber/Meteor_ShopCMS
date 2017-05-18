import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel, addressSchema } from '../base-model';

//declare collection name and export it
export const Malls = new Mongo.Collection('Malls');

//attach basics via baseModel (createdAt, title, etc.)
Malls.baseModel = baseModel;

Malls.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Malls.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


Malls.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  location: {
    type: addressSchema,
    optional: true
  },
  color_id: {
    type: String,
    max: 450,
    optional: true
  },
  numberOfStores: {
    type: Number,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {  // only set on insert
            return 0
        }
    }
  },
  schemaVersion: {
    type: Number,
    autoValue: function() {
      // only set on insert
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return 0
        }
    }
  }
});



Malls.attachSchema(Malls.schema);
Malls.attachSchema(Malls.baseModel);