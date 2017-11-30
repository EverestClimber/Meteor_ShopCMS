//top-level
import { SimpleSchema } from 'meteor/aldeed:simple-schema';



// LOCATION SCHEMA
// ---------------------------------------------

// { fullAddress: '57771 String Creek Rd, California, MO 65018, USA',
// I20171128-01:23:23.929(4)?      lat: 38.6297608,
// I20171128-01:23:23.929(4)?      lng: -92.5163592,
// I20171128-01:23:23.929(4)?      geometry: { type: 'Point', coordinates: [Object] },
// I20171128-01:23:23.930(4)?      placeId: 'ChIJJZnrvotVw4cRPZFckkWixS0',
// I20171128-01:23:23.930(4)?      street: 'String Creek Rd',
// I20171128-01:23:23.930(4)?      city: 'Walker Township',
// I20171128-01:23:23.931(4)?      state: 'California',
// I20171128-01:23:23.931(4)?      zip: '65018',
// I20171128-01:23:23.931(4)?      country: 'US' },
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

// BASE MODEL
// ---------------------------------------------
export const baseModel = new SimpleSchema({
  title: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  tags: {
    type: [String],
    optional: true,
  },
  special: {
    type: String,
    optional: true,
  },
  parentModelType: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
    optional: true,
  },
  deleted: {
    type: Boolean,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {  // only set on insert
            return false
        }
    }
  },
  ownerId: {
    type: String,
  /*  autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {  // only set on insert
            console.log('test',Meteor.userId())
           return Meteor.userId();
        }
    }*/
   },
  createdAt: {
    type: Date,
    autoValue: function() {
      // only set on insert
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return new Date()
        }
    }
  },
  updatedAt: {
    type: Date,
    // returns a new date on any update-- e.g. the last updated date
    autoValue: function() {
            return new Date()
    }
  },
});

// EXPORT BASE MODEL
// ---------------------------------------------