const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const EventScheme = require('../../models/Event');
const mongoose = require('mongoose');
const Event = mongoose.model('event', EventScheme);
const GroupScheme = require('../../models/Group')
const Group = mongoose.model('group', GroupScheme);

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

//Get a group
router.get('/:groupId', (req,res) => {
    let groupId = req.params.groupId;

    Group.findById(groupId, (err, group) =>{
        if(err) {
            res.send({'error': 'Unable to find group'});
        } else {
            res.send({'group': group});
        }
    });
});

//Create group
router.post('/createGroup', (req, res) => {
    let groupName = req.body.groupName;
    let userId = req.body.creatorId;

    let creator = {
        memberId: req.body.creatorId,
        memberPermission: 'owner'
    }

    Group.find({'groupName': groupName}, (err, group) => {
        if(err) {
            res.send({'error': 'group already exists'});
        }
    });

    User.findById(userId, (error, user) => {
        if(error) {
            res.send({'error': 'User does not exist' + error});
        }


        let newGroup = new Group(req.body);
        newGroup.members = [];
        newGroup.members.push(creator);
        newGroup.save()
        .then(newGroup => {
            User.update(
                { _id: userId},
                { $push : {groups: newGroup}}
            ).then(
                res.send({'success': 'new Group created' + newGroup})
            ).catch(e => {
                console.log(e);
            })
        
        }).catch(err => {
            console.log(err);
        });
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
        memberId: req.body.userId,
        memberPermission: 'admin'
    };

    User.findById(user._id, (req, res) => {
        if(!user) {
            res.send({'error': 'User does not exist'});
        }
    });

    Group.update(
        { _id: groupId }, 
        { $push: { members: user }}
    ).exec(function(err) {
        if(err){
            res.send({'error': 'Could not add user ' + err});
        } else {
            res.send({'user added successfully' : user});
        }
    });

});

//Update group member
router.put('/:groupId/updateMember/:userId', (req, res) => {
    let memberId = req.params.userId;
    let groupId = req.params.groupId;

    Group.findById(groupId, 'members', (err, group) => {
        if(err) {
            res.send({'error': 'Unable to find group' + err});
        }
        var member = user.memberss.id(memberId);
        if(!member) 
            res.send({'error': 'Unable to find member' + err});   
        if(req.body)     
            member.set(req.body);
        group.save()
        .then(
            res.send({'member': member, 'error': ''})
        ).catch(function(error) {
            res.send({'error': error});
        });
    });
});

//Delete group member
router.delete('/:groupId/deleteMember/:userId', (req, res) => {
    let memberId = req.params.userId;
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

    Group.findById(groupId, 'events', (err, group) => {
        if(err) {
            res.send({'error': 'Unable to find group ' + err});
        } else {
            console.log(group);
            res.send({'events' :group.events, 'error': ''});
        }
    }); 
});

router.get('/:groupId/getMembers', (req, res) => {
    let groupId = req.params.groupId;

    Group.findById(groupId, 'members', (err, group) => {
        if(err) {
            res.send({'error': 'Unable to find group ' + err});
        } else {
            console.log(group);
            res.send({'members': group.members, 'error': ''});
        }
    });
});

//Add group event
router.post('/:groupId/addEvent', (req, res) => {
    let groupId = req.params.groupId;

    let event = new Event(req.body); 

    Group.findById(groupId, function(err, group) {
        if(err) {
            res.send({'error': 'can not find group'});
        }
        
        console.log(group.events);
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
            console.log(err);
        });
    });
});


//Update group picture
router.put('/:groupId/updateGroupPicture', (req, res) => {
    let groupId = req.params.groupId;

    Group.findById(groupId, 'groupPicture', (err, group) => {
        if(err) {
            res.send({'error': 'Unable to find group'});
        } else {
            group.groupPicture = req.body;
            res.send({'success': 'Group picture updated successfully'});
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

//Invite user to group
router.post('/:groupId/inviteUser/:userId', (req, res) => {
    let groupId = req.params.groupId;
    let userId = req.params.userId;

    User.findById(userId, (err, user) => {
        if(err) {
            res.send({'error': 'unable to find user'});
        } else {
            user.groupRequests.push(groupId);
            user.save()
            .then(
                res.send({'success': 'User invited to group', 'error': ''})
            )
            .catch(function(err){
                console.log(err);
            });
        }
    });
});

module.exports = router;