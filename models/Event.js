const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    start : {
        type: String
    },
    end : {
        type: String
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