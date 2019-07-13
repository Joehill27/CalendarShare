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
                memberName: {
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

module.exports = Group = mongoose.model('group', GroupSchema);