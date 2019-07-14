const express = require('express');
const router = express.Router();
const Group = require('../../models/Group');
const User = require('../../models/User');
const Event = require('../../models/Event');
const ImageSchema = require('../../models/Image');
const mongoose = require('mongoose');
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

//Get all groups
router.get('/getGroups', (req, res) => {
    Group.find({}, '_id groupName members events groupPicture', (err, groups) => {
        if(err) {
            res.send({'error': 'Could not get all groups' + err});
        } else {
            res.send({'groups': groups});
        }
    })
});

//Create group
router.post('/createGroup', (req, res) => {
    let groupName = req.body.groupName;

    let creator = {
        memberName: req.body.creatorName,
        memberPermission: 'owner'
    }

    Group.find({'groupName': groupName}, (err, group) => {
        if(group) {
            res.send({'error': group + 'group already exists'});
        }
    });

    let newGroup = new Group(req.body);
    newGroup.members.push(creator);
    newGroup.save()
    .then(newGroup => {
        res.send({'success': 'new Group created'})
    
    }).catch(err => {
        res.send({'error': err});
    });
});

//Delete group
router.delete('/:groupId/deleteGroup', (req, res) => {
    let groupId = req.params.groupId;

    Group.findByIdAndDelete(groupId, (err, group) => {
        if(!group) {
            res.send({'error': 'Group does not exist'});
        } else {
            res.send({'success!': 'Group deleted'});
        }
    });
});

//Add group member
router.post('/:groupId/addMember', (req, res) => {
    let groupId = req.params.groupId;
    var user = {
        _id: req.body.userId,
        'userName': req.body.userName
    };

    User.findOne({'userName': user.userName}, (req, res) => {
        if(!user) {
            res.send({'error': 'User does not exist'});
        }
    });

    Group.update(
        { _id: groupId }, 
        { $push: { users: user }}
    ).exec(function(err) {
        if(err){
            res.send({'error': 'Could not add user ' + err});
        } else {
            res.send({'user added successfully' : user});
        }
    });

});

//Delete group member
router.delete('/:groupId/deleteMember/:userId', (req, res) => {
    let memberId = req.params.memberId;
    let groupId = req.params.groupId;

    Group.findById(groupId, function(err, group) {
        if(err) {
            res.send({'error': 'can not find group'});
        }
        group.events.pull(memberId);
        group.save()
        .then(
            res.send({'success': 'member deleted', 'error': ''})
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });
});

//Get all group events
router.get('/:groupId/getEvents', (req, res) => {
    let groupId = req.params.groupId;

    Group.findById(groupId, 'groupEvents', (err, group) => {
        if(err) {
            res.send({'error': 'Unable to find group ' + err});
        } else {
            res.send({'events' :group.groupEvents, 'error': ''});
        }
    });
});

//Add group event
router.post('/:groupId/addEvent', upload.single('image'), (req, res) => {
    let groupId = req.params.groupId;

    let event = new Event(req.body);

    if(req.file.path) {
        new_img.img.data = fs.readFileSync(req.file.path)
        new_img.img.contentType = 'image/jpeg';
        new_img.save(function(err, img) {
            if(err) {
                res.send({'error': 'Unable to save picture' + err});
            } else {
                event.eventPicture = img.id;
            }
        });
    }

    Group.findById(groupId, function(err, group) {
        if(err) {
            res.send({'error': 'can not find group'});
        }
        group.events.push(event);
        group.save()
        .then(
            res.send({'success': 'event added' + event, 'error': ''})
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });
});

//Update group event
router.put('/:groupId/updateEvent/:eventId', (req, res) => {
    let eventId = req.params.eventId;
    let groupId = req.params.groupId;
    
    Group.findById(groupId, function(err, group){
        var event = group.events.id(eventId);
        if(!event) res.send({'error': 'Unable to find event' + err});   
            if(req.body)     
                event.set(req.body);

        group.save()
        .then(
            res.send({'event': event, 'error': ''})
        ).catch(function(err) {
            res.send({'error': err});
        });
    });
});

//Delete event picture
//Delete group event
router.delete('/:groupId/deleteEvent/:eventId', (req, res) => {
    let eventId = req.params.eventId;
    let groupId = req.params.groupId;

    Group.findById(groupId, function(err, group) {
        if(err) {
            res.send({'error': 'can not find group'});
        }
        group.events.pull(eventId);
        group.save()
        .then(
            res.send({'success': 'event deleted', 'error': ''})
        )
        .catch(function(err){
            res.send({'error': err});
        });
    });
});

//TODO delete old picture
//Update group event picture
router.put('/:groupId/:eventId/picture', upload.single('image'), (req, res) => {
    let groupId = req.params.groupId;
    let eventId = req.params.eventId;

        new_img.img.data = fs.readFileSync(req.file.path)
        new_img.img.contentType = 'image/jpeg';
        new_img.save(function(err, img) {
            Group.findById(groupId, 'events', (err, events) => {
                let event = group.events.id(eventId);

                if(!event) {
                    res.send({'error': 'Event does not exist'});
                } else {
                    event.eventPicture = img.id;
                    res.send({'success!': 'Event picture updated'});
                }
            });
        });
});

//TODO delete old picture
//Update group picture
router.put('/:groupId/groupPicture', upload.single('image'), (req, res) => {
    let groupId = req.params.groupId;
    
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save(function(err, img) {
        if(err) {
            res.send({'error': 'Unable to save image' + err});
        } else {
            Group.findById(groupId, 'groupPicture', (err, group) => {
                group.groupPicture = img.id;
                group.save()
                .then(
                    res.send({'success': 'Group picture updated'})
                )
                .catch((err) => {
                    res.send({'error': err});
                })
            });
        }
    });
});

//Update group settings
router.put('/:groupId/settings', (req, res) => {
    let groupId = req.params.groupId;

    Group.findById(groupId, 'settings', (err, group) => {
        if(err) {
            res.send({'error': 'Unable to find group'});
        } else {
            group.settings = req.body;
            res.send({'success': 'Group settings updated successfully'});
        }
    });
});

module.exports = router;