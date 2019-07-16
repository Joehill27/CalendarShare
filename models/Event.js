const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    start : {
        type: Date
    },
    end : {
        type: Date
    },
    eventname: {
        type: String
    },
    eventInfo: {
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
    }
});

module.exports = Event;