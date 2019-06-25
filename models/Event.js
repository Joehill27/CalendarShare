const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo recurring events in schema
let Event = new Schema({
    start : {
        type: Date
    },
    end : {
        type: Date
    },
    duration : {
        type: Number
    },
    eventname: {
        type: String
    },
    eventinfo: {
        type: String
    },
    recurring : {
        type: Boolean
    }

});

module.exports = Event;