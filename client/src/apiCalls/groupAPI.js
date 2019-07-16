import axios from "axios";

//Create group
export const createGroup = async(group) => {
    try {
        let result = await axios.post('/api/group/createGroup', group);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Delete group
export const deleteGroup = async(groupId) => {
    try {
        let result = await axios.delete('/api/group/' + groupId + '/deleteGroup');
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Get all group events
export const getGroupEvents = async(groupId) => {
    try {
        let groupEvents = await axios.get('/api/group/' + groupId + '/getEvents');
        return groupEvents;
    } catch(e) {
        console.log(e);
    }
}

//Create group event
export const createGroupEvent = async(groupId, event, image) => {
    try {
        event.image = image;
        let result = await axios.post('/api/group/'+ groupId + '/addEvent', event);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Update group event
export const updateGroupEvent = async(groupId, event) => {
    try {
        let result = await axios.put('/api/group/' + groupId + '/updateEvent/' + event.eventId);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Delete group event
export const deleteGroupEvent = async(groupId, eventId) => {
    try {
        let result = await axios.delete('/api/group/' + groupId + '/deleteEvent/' + eventId);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Add user to group
export const addGroupMemeber = async(user) => {
    try {
        let result = await axios.post('/api/group/' + groupId + '/addMember');
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Delete user from group
export const deleteUserFromGroup = async(groupId, userId) => {
    try {
        let result = await axios.delete('/api/group/' + groupId + '/deleteMember/' + userId);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Invite user to group
export const inviteUserToGroup = async(groupId, userId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Update group picture
export const updateGroupPicture = async(groupId, image) => {
    try {
        let result = await axios.put('/api/group/', );
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Delete group picture
export const deleteGroupPicture = async(groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Update group settings
export const updateGroupSettings = async(groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Change member roles
export const changeMemberRole = async(groupId, member) => {
    try {

    } catch(e) {
        console.log(e);
    }
}
