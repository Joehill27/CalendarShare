const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventScheme = require('./Event');

//TODO update settings
let GroupSchema = new Schema({
    groupName : {
        type: String
    },
    members: {
        type: [
            {
                memberId: {
                    type: String
                },
                memberPermission: {
                    type: String
                }
            }
        ]
    },
    events: {
        type: [EventScheme]
    },
    groupPicture: {
        type: String
    },
    settings : {
        type: String
    }
    
});

module.exports = GroupSchema;