const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    start : {
        type: String
    },
    end : {
        type: String
    },
    eventName: {
        type: String
    },
    eventDetails: {
        type: String
    },
    recurring : {
        type: Boolean
    },
    eventPicture: {
        type: String
    },
    eventType: {
        type: String
    },
    location: {
        address: {
            type: String
        },
        zipCode: {
            type:String
        },
        city : {
            type:String
        },
        country: {
            type:String
        }
    }
});

module.exports = Event;