const express = require('express');
const router = express.Router();
const Group = require('../../models/Group');

//Get all groups
router.get('/getGroups', (req, res) => {

});

//Create group
router.post('/createGroup', (req, res) => {

});

//Update group
router.put('/updateGroup', (req, res) => {

});

//Delete group
router.delete('/deleteGroup', (req, res) => {

});

//Add group member
router.post('/:groupId/addMember', (req, res) => {
    let groupId = req.params.groupId;
    var user = {
        _id: userId,
        'userName': req.body.userName
    };

    //TODO check if group exists

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

    //If they do exist, add them to the group
});

//Delete group member
router.delete('/:groupId/deleteMember/:userId', (req, res) => {

});

//Add group event
router.post('/:groupId/addEvent', (req, res) => {

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
        // Group.Contact.pull(contactId);
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

module.exports = router;