const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Group = require('../../models/Group');
const EventScheme = require('../../models/Event');
const mongoose = require('mongoose');
const Event = mongoose.model('event', EventScheme);

//Used to check if emails exist when creating an account
var emailCheck = require('email-check');

//Checks if a user exists by username, if they do checks password
router.post('/login', (req, res) => {
    let name = req.body.username;
    let password = req.body.password;
    User.findOne({username: name}).exec(function(err, user) {
    if(!user) {
        res.send({'error' : 'user does not exist'});
    } else{
        res.send({user: user, error: ''});
    }
    });
});

//Check if a user exists
router.get('/get/:username', (req, res) => {
    let name = req.params.username;
    User.findOne({'username': name}, (err, user) => {
        if(err) {
            res.send({'error' : 'user does not exist'});
        } else {
            res.send({'user': user, 'error': ''});
        }
    })
});

//Creates an account with given info
router.post('/createAccount', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;

    emailCheck(req.body.email).then(function(result) {
        if(result == true)
        {
            // Check if username is taken
            User.findOne({'username': username}).exec(function(err, user) {
                if(user) {
                    res.send({'error': 'Account with that username already exists'});
                    return;
                }
            });
            
            // Check if email has already been used
            User.findOne({'email': email}).exec(function(err, user) {
                if(!user) {
                    let newUser = new User(req.body);
                    newUser.save()
                    .then(newUser => {
                        res.send({'user': newUser, 'error' : ''});
                    })
                } else {
                    res.send({'error': 'User with email already exists'});
                }
            })
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
router.post('/:userId/createEvent', (req, res) => {
    let userId = req.params.userId;

    let event = new Event(req.body);
    User.update(
        { _id: userId }, 
        { $push: { events: event }}
        ).exec(function(err) {
        if(err){
            res.send({'error': 'Could not create event ' + err});
        } else {
            res.send({'event created successfully' : event, 'error': ''});
        }
    });
});

//Update user event
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
            console.log(err);
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
            console.log(err);
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
router.post('/:userId/createGroupRequest/:groupId', (req, res) => {
    let userId = req.params.userId;
    let groupId = req.params.groupId;

    let groupRequest = {
        'groupId': groupId
    }

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
router.delete('/:userId/deleteGroupRequest/:groupId', (req, res) => {
    let userId = req.params.userId;
    let groupId = req.params.groupId;

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
router.post('/:userId/addFriend', (req, res) => {
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

//Update user settings
router.put('/:userId/updateSettings', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, 'settings', (err, user) => {
        if(err) {
            res.send({'error': 'Unable to find user' + err});
        } else {
            user.settings = req.body;
            user.save();
            res.send({'success!': 'Update user settings'});
        }
    });
});

//Update user's profile picture
router.put('/:userId/updateProfilePicture', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, 'profilePicture', (err, user) => {
        if(err) {
            res.send({'error': 'Unable to find user' + err});
        } else {
            user.profilePicture = req.body.imageId;
            user.save();
            res.send({'success': 'profile picture updated', 'error':''});
        }
    })
});

//Gets the users profile picture's image id, then gets the image by id
router.get('/:userId/getProfilePicture', (req, res) => {
    let userId = req.params.userId;
    User.findById(userId, function(err, user) {
        let image = user.profilePicture;
        if(!user)
            res.send({'error': 'user does not exist'});
        else
            res.send({'image': image});
    });
});

module.exports = router;