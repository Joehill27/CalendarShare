import axios from "axios";

let hostUrl = 'http://localhost:3001';
// let hostUrl = '';

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
        let groupEvents = await axios.get(hostUrl + '/api/group/' + groupId + '/getEvents');
        return groupEvents.data.events;
    } catch(e) {
        console.log(e);
    }
}

export const getMembers = async(groupId) => {
    try {
        let members = await axios.get(hostUrl + '/api/group/' + groupId + '/getMembers');
        return members.data.members;
    } catch(e) {
        console.log(e);
    }
}

//Create group event
export const createGroupEvent = async(groupId, event) => {
    try {
        let result = await axios.post('/api/group/'+ groupId + '/addEvent', event);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Update group event
export const updateGroupEvent = async(groupId, event) => {
    try {
        let result = await axios.put('/api/group/' + groupId + '/updateEvent/' + event.eventId, event);
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
export const addMember = async(user, groupId) => {
    try {
        let result = await axios.post('/api/group/' + groupId + '/addMember', user);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Update member
export const updateMember = async(groupId, member) => {
    try {
        let result = await axios.put('/api/group/');
    } catch(e) {
        console.log(e);
    }
}

//Delete user from group
export const deleteMember = async(groupId, userId) => {
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

//Update group settings
export const updateGroupSettings = async(groupId, settings) => {
    try {
        let result = await axios.put('/api/group/settings', settings);
        return result;
    } catch(e) {
        console.log(e);
    }
}
