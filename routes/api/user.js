const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const mongoose = require('mongoose');
const ImageSchema = require('../../models/Image');
const Image = mongoose.model('img', ImageSchema);
const Group = require('../../models/Group');

//Setting up where to store new images
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage });
const fs = require('fs');

//Used to check if emails exist when creating an account
var emailCheck = require('email-check');

//Checks if a user exists by username, if they do checks password
router.post('/login', (req, res) => {
    let name = req.body.username;
    let password = req.body.password;
    User.findOne({username: name}).select('-groups -friends -email -events -__v').exec(function(err, user) {
    if(!user) {
        res.send({'error' : 'user does not exist'});
    } else{
        res.send({'user': user, 'error': ''});
    }
    });
});

//Check if a user exists
router.get('/get', (req, res) => {
    let name = req.body.username;
    User.findOne({username: name}).select('-password -groups -friends -email -events -__v').exec(function(err, user) {
        if(!user) {
            res.send({'error' : 'user does not exist'});
        } else {
            res.send({'user': user, 'error': ''});
        }
    })
});

//Creates an account with given info
router.post('/createAccount', (req, res) => {
    let username = req.body.username;

    emailCheck(req.body.email).then(function(result) {
        if(result == true)
        {
            User.findOne({'username': username}).exec(function(err, user) {
                if(!user) {
                    let newUser = new User(req.body);
                    newUser.save()
                    .then(newUser => {
                        res.send({'user': newUser, 'error' : ''});
                    })
                } else {
                    res.send({'error': 'Account with that username already exists'});
                }
            });
        } else {
            res.send({'error': 'Invalid email address'});
        }
    }).catch(function(err)
    {
        res.send({'error': 'Invalid email address' + err});
    });
});

//Gets all users
router.get('/allUsers', (req, res) => {
    User.find({}, '_id username events groups profilePicture' ,(err, users) => {
        if(err) {
            res.send({'error': 'Could not get all users'});
            next();
        }
        else {
            res.json(users);
        }
    })
});

//Deletes a user by id
router.delete('/deleteAccount/:userId', (req, res) => {
    let userId = req.params.usedId;

    User.findOneAndDelete({id: userId}, function(err, user) {
        if(!user) {
            res.send({error: 'user not found'});
        }
        else {
            res.send({'success': 'user deleted', 'error': ''});
        }
    })
});

//Get all user events
router.get('/:userId/events', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, function(err, user){
        let events = user.events;
        
        if(user) {
            res.send({'events': events,'error' : ''});
        }
        else {
            res.send({'error': 'User not found'});
        }
    });
});

//Create user event
router.post('/:userId/createEvent', upload.single('image'), (req, res) => {
    let userId = req.params.userId;
    var new_img = new Image;

    if(req.file.path) {
        new_img.img.data = fs.readFileSync(req.file.path)
        new_img.img.contentType = 'image/jpeg';
        new_img.save(function(err, img) {
        if(err) {
            res.send({'error': 'Unable to save picture' + err});
        } else {
            var event = {
                _id: mongoose.Types.ObjectId(),
                'start': req.body.start,
                'end': req.body.end,
                'eventInfo': req.body.eventInfo,
                'eventName': req.body.eventName,
                'recurring': req.body.recurring,
                'eventPicture': img.id
            };
        
            User.update(
                { _id: userId }, 
                { $push: { events: event }}
            ).exec(function(err) {
                if(err){
                    res.send({'error': 'Could not update event ' + err});
                } else {
                    res.send({'event created successfully' : event, 'error': ''});
                }
            });
        }
    });
    } else {
        var event = {
            _id: mongoose.Types.ObjectId(),
            'start': req.body.start,
            'end': req.body.end,
            'eventInfo': req.body.eventInfo,
            'eventName': req.body.eventName,
            'recurring': req.body.recurring,
        };
    
        User.update(
            { _id: userId }, 
            { $push: { events: event }}
        ).exec(function(err) {
            if(err){
                res.send({'error': 'Could not update event ' + err});
            } else {
                res.send({'event created successfully' : event, 'error': ''});
            }
        });
    }
});

//Modify user event
router.put('/:userId/updateEvent/:eventId', (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.params.userId;
    
    User.findById(userId, function(err, user){
        var event = user.events.id(eventId);
        if(!event) 
            res.send({'error': 'Unable to find event' + err});   
        if(req.body)     
            event.set(req.body);
        user.save()
        .then(
            res.send({'event': event, 'error': ''})
        ).catch(function(err) {
            res.send({'error': err});
        });
    });
});

//Delete user event
router.delete('/:userId/deleteEvent/:eventId', (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if(err) {
            res.send({'error': 'can not find user'});
        }
        user.events.pull(eventId);
        user.save()
        .then(
            res.send({'success': 'event deleted', 'error': ''})
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });
});

//Choose picture for event
router.put('/:userId/event/updatePicture', upload.single('image'), (req, res) => {
    let userId = req.params.userId;

    var new_img = new Image;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save(function(err, img) {

        if(err) {
            res.send({'error': 'unable to save image'});
        }

        User.findById(userId, 'events', (err, user) => {
            if(err) {
                res.send({'error': 'User does not exist'});
            } else {
                var event = user.events.id(eventId);
                if(!event) 
                res.send({'error': 'Unable to find event' + err});   
                
                event.profilePicture = img.id;

                user.save()
                .then(
                    res.send({'event': event, 'error': ''})
                ).catch(function(err) {
                    res.send({'error': err});
                });
            }
        });
    });
});

//Get all user groups
router.get('/:userId/groups', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, function(err, user){
        let groups = user.groups;
        
        if(user) {
            res.send({'groups': groups, 'error' : ''});
        }
        else {
            res.send({
                'error': 'User not found'
            });
        }
    });
});

//Add group to user
router.post('/:userId/addGroup', (req, res) => {
    let userId = req.params.userId;
    let groupName = req.body.groupName;
    
    group.findOne({'groupName': groupName}, '_id', (err, group) => {
        if(err) {
            res.send({'error': 'Group does not exist'});
            next();
        } else {
            User.update(
                { _id: userId }, 
                { $push: { groups: group }}
            ).exec(function(err) {
                if(err){
                    res.send({'error': 'Could not add group ' + err});
                } else {
                    res.send({'group added successfully' : group});
                }
            });
        }
    });
});


//Delete group from user
router.delete('/:userId/deleteGroup/:groupId', (req, res) => {
    let groupId = req.params.groupId;
    let userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if(err) {
            res.send({'error': 'can not find user' + err});
        }
        user.groups.pull(groupId);
        user.save()
        .then(
            res.send('group deleted')
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });
});

//Get all group requests
router.get('/:userId/getGroupRequests', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, 'groupRequests', (err, groupRequests) => {
        if(err) {
            res.send({'error': 'Unable to get group requests' + err});
        } else {
            res.send({'groupRequests': groupRequests, 'error': ''});
        }
    });
});

//Create group request
router.post('/:userId/createGroupRequest', (req, res) => {
    let userId = req.params.userId;
    let groupId = req.body.groupId;
    let groupRequest = req.body;

    Group.findById(groupId, (err, group) => {
        if(err) {
            res.send({'error': 'Group does not exist' + err});
        } else {
            User.update(
                { _id: userId }, 
                { $push: { 'groupRequests': groupRequest }}
            ).exec(function(err) {
                if(err){
                    res.send({'error': 'Could not add group request' + err});
                } else {
                    res.send({'success': 'Group request added successfully', 'error': ''});
                }
            });
        }
    });
});


//Delete group request
router.delete('/:userId/deleteGroupRequest', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, 'groupRequests', (err, user) => {
        if(err) {
            res.send({'error': 'Unable to delete group request'+ err});
        } else {
            user.groupRequests.pull(groupId);
            user.save()
            .then(
                res.send({'success': 'Group request deleted', 'error': ''})
            )
            .catch(function(err){
                res.send({'error': err});
            });
        }
    });
});

//Accept group request
router.post('/:userId/acceptGroupRequest/:groupId', (req, res) => {
    let userId = req.params.userId;
    let groupId = req.params.groupId;
    let memberPermission = req.body.memberPermission;

    let member = {
        'memberId': userId,
        'memberPermission': memberPermission
    }

    User.findById(userId, 'groups groupRequests', (err, user) => {
        if(err) {
            res.send({'error': 'Unable to find user' + err});
        } else {
            user.groups.push(groupId);
            user.groupRequests.pull(groupId);
            user.save();
            Group.findById(groupId, 'members', (err, group) => {
                if(err) {
                    res.send({'error': 'Unable to find group' + err});
                } else {
                    group.members.push(member);
                    res.send({'success': 'User join group', 'error': ''});
                }
            });
        }
    });

});


//Get all incoming friend requests
router.get('/:userId/getFriendRequests', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, 'friendRequests', function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});
        
        var friendRequests = user.friendRequests;
        res.send({'friendRequests': friendRequests, 'error': ''});
    })
});

//Add incoming friend request
router.post('/:userId/createFriendRequest', (req, res) => {
    let fromUserId = req.params.userId;
    let toUserId = req.body.userId;

    User.findById(toUserId, function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});

        var request = {
            from: fromUserId,
        }

        User.update(
            { _id: toUserId }, 
            { $push: { friendRequests: request }}
        ).exec(function(err) {
            if(err) {
                res.send({'error': err});
            } else {
                res.send({'request added successfully' : request});
            }
        });
    });
});

//Delete incoming friend request
router.delete('/:userId/deleteFriendRequest/:friendId', (req, res) => {
    let userId = req.params.userId;
    let friendId = req.params.userId;
    User.findById(userId, function(err, user) {
        if(err) 
            res.send({'error': 'user not found' + err});

        user.friendRequests.pull(friendId);
        user.save()
        .then(
            res.send({'succes': 'friend request deleted', 'error': ''})
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });

});

//Get all user friends
router.get('/:userId/friends', (req, res) => {
    let userId = req.params.userId;
    User.findById(userId, 'friends', function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});

        var friends = user.friends;

        res.send({'friends': friends});
    });
});

//Add friend
router.post('/:userId/addFriends', (req, res) => {
    let friendOneId = req.body.friendOneId;
    let friendOneName = req.body.friendOneName;
    let friendTwoId = req.body.friendTwoId;
    let friendTwoName = req.body.friendTwoName;
    let userWithRequest = req.params.userId;

    //Check if user to be added exists
    User.findById(friendOneId, (err, findUser) => {
        if(err) {
            res.send({'error': "user does not exist"});
        } else {

            let friendOne = {
                friendId: friendTwoId,
                friendName: friendTwoName
            }
            let friendTwo = {
                friendId: friendOneId,
                friendName: friendOneName
            }
            
            //Add friend, remove incoming friend request
            User.update(
                { _id: friendOneId }, 
                { $push: { friends: friendOne }},
                { $pull: { friendRequests: friendTwoId}}
            ).exec(function(err) {
                if(err) {
                    res.send({'error': err});
                } else {
                    //Add friend, no friend request ot delete
                    User.update(
                        { _id: friendTwoId},
                        { $push : {friends : friendTwo}}
                    )
                    res.send({'friends added successfully' : friend});
                }
            });
        }
    });
});

//Delete friend
router.delete('/:userId/deleteFriend/:friendId', (req, res) => {
    let friendId = req.params.friendId;
    let userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if(err) {
            res.send({'error': 'can not find user'});
        }
        user.friends.pull(friendId);
        user.save()
        .then(
            User.update(
                { _id: friendId},
                { $pull : {friends: userId}}
            ).then(
                res.send('friend deleted')
            )
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });
});

//Add/update user picture by updating the image id
router.post('/:userId/addPicture', upload.single('image'), (req, res) => {
    let userId = req.params.userId;
    var new_img = new Image;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save(function(err, img) {

        User.findById(userId, function(err, user) {
            user.profilePicture = img.id;
            user.save();
            res.send({'user profile picture updated': user});
        });
    });
});

//Gets the users profile picture's image id, then gets the image by id
router.get('/:userId/getProfilePicture', (req, res) => {
    let userId = req.params.userId;
    User.findById(userId, function(err, user) {
        let imageId = user.profilePicture;
        if(!user)
            res.send({'error': 'user does not exist'});
            Image.findById(imageId, function(err, img) {
                if (err)
                    res.send(err);
                res.contentType('json');
                res.send({'image': img});
            });
    });
});


//Get all of the user's friend's events
router.get('/:userId/friends/events', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, (err, user) => {
        if(err) {
            res.send({'error': 'User does not exist'});
        } else {
            User.find({'friendId': userId}, 'events', (err, events) => {
                if(err) {
                    res.send({'error': err});
                } else {
                    res.send({'friendEvents': events, 'error': ''});
                }
            });
        }
    })
});

//Get all of the user's group's events
router.get('/:userId/groups/events', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, (err, user) => {
        if(err) {
            res.send({'error': 'User does not exist'});
        } else {
            Group.find({'memberId': userId}, 'events', (err, events) => {
                if(err) {
                    res.send({'error': err});
                } else {
                    res.send({'groupEvents': events});
                }
            });
        }
    })
});

module.exports = router;