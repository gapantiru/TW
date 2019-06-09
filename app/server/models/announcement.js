'use strict';

let mongoose = require('mongoose');
let validator = require('validator');
let settings = require('../settings');
let Schema = mongoose.Schema;

const default_image = settings.imgAnnouncementsPAth + 'default_ann.png';

let apartment_schema = Schema({

    partitioning: {
        type: String,
        required: true
    },
    comfort: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    nr_of_rooms: {
        type: Number,
        required: true
    },
    surface: {
        type: Number,
        required: true
    }

});

let house_schema = Schema({

    land_area: {
        type: Number,
        required: true
    },
    construction_year: {
        type: Number,
        required: true
    },
    surface: {
        type: Number,
        required: true
    }

});

let ground_schema =Schema({

    ground_type: {
        type: String,
        required: true
    },
    land_area: {
        type: Number,
        required: true
    },
    land_classification: {
        type: String,
        required: true
    }

});

// TODO: add validators
let announcement_schema = {
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    }, //"Apartment / House / Land"
    type: {
        type: String, required: true
    },//"Sell / Rent",
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    city :{
      type: String,
        required: true
    },
    address: {
        type: String
    },
    images: {
      type: [String],
        required: true,
        default: [default_image]
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
    specific_data : {
        apartment: apartment_schema,
        house: house_schema,
        ground: ground_schema
    },
};

let AnnouncementSchema = new mongoose.Schema(announcement_schema,
    { collation: { locale: 'en_US', strength: 1 } });  // strength 1 -> ignore cases on query

module.exports = mongoose.model('Announcement', AnnouncementSchema);