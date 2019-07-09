const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventScheme = require('./Event');
const ImageScheme = require('./Image');

let UserSchema = new Schema({
    email: {
        type: String
    },
    username : {
        type: String
    },
    password: {
        type: String
    },
    events: {
        type: [EventScheme]
    },
    friends : {
        type: [
            {
                friendId: {
                    type: String
                },
                friendName: {
                    type: String
                }
            }
        ]
    },
    friendRequests : {
        type: [{
            from: {
                type: String
            },
            to: {
                type: String
            }
        }]
    },
    profilePicture: {
        type: String
    }

});

module.exports = User = mongoose.model('user', UserSchema);
