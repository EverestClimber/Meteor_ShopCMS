import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Shops = new Mongo.Collection('Shops');

//attach basics via baseModel (createdAt, title, etc.)
Shops.baseModel = baseModel;

Shops.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Shops.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



export const addressSchema = new SimpleSchema({
    fullAddress: {
        type: String,
        optional: true
    },
    lat: {
        type: Number,
        decimal: true,
        optional: true
    },
    lng: {
        type: Number,
        decimal: true,
        optional: true
    },
    geometry: {
        type: Object,
        blackbox: true,
        optional: true
    },
    placeId: {
        type: String,
        optional: true
    },
    street: {
        type: String,
        max: 100,
        optional: true
    },
    city: {
        type: String,
        max: 50,
        optional: true
    },
    state: {
        type: String,
        optional: true
    },
    zip: {
        type: String,
        optional: true
    },
    country: {
        type: String,
        optional: true
    },
    maps_url: {
        type: String,
        optional: true
    },
});

Shops.schema = new SimpleSchema({
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
  categories: {
    type: [String],
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
  phone2: {
    type: String,
    optional: true,
  },
  website: {
    type: String,
    optional: true,
  },
  instagram: {
    type: String,
    optional: true,
  },
  facebook: {
    type: String,
    optional: true,
  },
  twitter: {
    type: String,
    optional: true,
  },
  youtube: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    optional: true,
  },
  ownerId: {
    type: String,
    optional: true,
  },
  openDays: {
    type: [String],
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  mallId: {
    type: String,
    optional: true,
  },
  numberOfReviews: {
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
  },
});


Shops.attachSchema(Shops.schema);
Shops.attachSchema(Shops.baseModel);
// INDEXES
Meteor.startup(function() {
  if (Meteor.isServer) {
    Shops._ensureIndex({"location.geometry": "2dsphere"});
  }
});

