const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventScheme = require('./Event');
const ImageScheme = require('./Image');
//TODO update settings

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
                }
            }
        ]
    },
    groups: {
        type: [
                {
                    group: {
                        type: {
                            groupId : {
                                type: String
                            }
                        }
                    }
                }

        ]
    },
    friendRequests : {
        type: [{
            from: {
                type: String
            }
        }]
    },
    groupRequests : {
        type: [{
            from: {
                type: String
            }
        }]
    },
    profilePicture: {
        type: String
    },
    settings: {
        bio : {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    }

});

module.exports = User = mongoose.model('user', UserSchema);
