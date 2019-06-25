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

    //Check if user exists

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

});

//Delete group event
router.delete('/:groupId/deleteEvent/:eventId', (req, res) => {

});

module.exports = router;