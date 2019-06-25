const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventScheme = require('./Event');

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
    }
    
});

module.exports = Group = mongoose.model('group', GroupSchema);