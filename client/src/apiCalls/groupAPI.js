import axios from "axios";


//Get group
export const getGroup = async(groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Create group
export const createGroup = async(group) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Delete group
export const deleteGroup = async(groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Get all group events
export const getGroupEvents = async(groupId) => {
    try {
        let response = await axios.get('/api/group/' + groupId + '/getEvents');
        return response
    } catch(e) {
        console.log(e);
    }
}

//Create group event
export const createGroupEvent = async(groupId, event) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Update group event
export const updateGroupEvent = async(groupId, event) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Delete group event
export const deleteGroupEvent = async(groupId, eventId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Get all group members
export const getGroupMembers = async(groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Add user to group

//Delete user from group

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
