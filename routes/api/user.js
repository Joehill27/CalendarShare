const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const mongoose = require('mongoose');
const ImageSchema = require('../../models/Image');
const Image = mongoose.model('img', ImageSchema);


//Setting up where to store new images
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage });
const fs = require('fs');


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
    var event = {
        _id: mongoose.Types.ObjectId(),
        'start': req.body.start,
        'end': req.body.end,
        'eventInfo': req.body.eventInfo,
        'eventName': req.body.eventName,
        'recurring': req.body.recurring
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
});

//Modify user event
router.put('/:userId/updateEvent/:eventId', (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.params.userId;
    
    User.findById(userId, function(err, user){
        var event = user.events.id(eventId);
        if(!event) res.send({'error': 'Unable to find event' + err});   
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
        // User.Contact.pull(contactId);
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

//Get all user groups
router.get('/:userId/groups', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, function(err, user){
        let groups = user.groups;
        
        if(user) {
            res.send({
                'groups': groups,
                'error' : ''
            });
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
    var group = {
        _id: groupId,
        'groupName': req.body.groupName
    };

    //TODO check if group exists

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

//Get all incoming friend requests
router.get('/:userId/getFriendRequests', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});
        
        var friendRequests = user.friendRequests;
        res.send({'friendRequests': friendRequests});
    })
});

//Add incoming friend request
router.post('/:userId/createFriendRequest', (req, res) => {
    let toUserId = req.params.userId;
    let fromUserId = req.body.userId;

    User.findById(toUserId, function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});
        
        var request = {
            from: {
                fromUserId
            },
            to : {
                toUserId
            }
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
router.delete('/:userId/deleteFriendRequest', (req, res) => {
    let userId = req.params.userId;
    let friendId = req.body.userId;
    User.findById(userId, function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});

        user.friendRequests.pull(friendId);
        user.save()
        .then(
            res.send('friend request deleted')
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });

});

//Get all user friends
router.get('/:userId/friends', (req, res) => {
    let userId = req.params.userId;
    User.findById(userId, function(err, user) {
        if(!user) 
            res.send({'error': 'user not found'});

        var friends = user.friends;

        res.send({'friends': friends});
    });
});

//Add friend
router.post('/:userId/addFriend', (req, res) => {
    let name = req.body.name;
    let userId = req.params.userId;

    //Check if user to be added exists
    User.findOne({username: name}).exec(function(err, findUser) {
        if(!findUser) {
            res.send({'error': "user does not exist"});
        } else {
            User.findById(userId, (req, user) => {
                var friend = {
                    _id: findUser._id,
                    'name': name
                };
            
                User.update(
                    { _id: userId }, 
                    { $push: { friends: friend }}
                ).exec(function(err) {
                    if(err) {
                        res.send({'error': err});
                    } else {
                        res.send({'friend added successfully' : friend});
                    }
                });
            });
        }
    });
});

//Delete friend
router.delete('/:userId/deleteFriend/:friendId', (req, res) => {
    let friendId = req.params.friendId;
    User.findById(userId, function(err, user) {
        if(err) {
            res.send({'error': 'can not find user'});
        }
        // User.Contact.pull(contactId);
        user.friends.pull(friendId);
        user.save()
        .then(
            res.send('friend deleted')
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
router.get('/:userId/getPicture', (req, res) => {
    let userId = req.params.userId;
    User.findById(userId, function(err, user) {
        let imageId = user.profilePicture;
        if(!user)
            res.send({'error': 'user does not exist'});
            Image.findById(imageId, function(err, img) {
                if (err)
                    res.send(err);
                // console.log(img);
                res.contentType('json');
                res.send({'Here is the image': img});
            });
    });
});


module.exports = router;