import axios from "axios";

//Get user
export const getUser = async(userName) => {
    try {
        let user = await axios.get('/api/user/get', userName);
    } catch(e) {
        console.log(e);
    }
}

//Get all friend requests
export const getFriendRequests = async(userId) => {
    try {
        let friendRequests = await axios.get('/api/user/' + userId + '/getFriendRequests');
        return friendRequests;
    } catch(e) {
        console.log(e);
    }
}

//Create friend request
export const createFriendRequest = async(toId, fromId) => {
    try {
        let result = await axios.get('/api/user/' + fromId + '/createFriendRequest', toId);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//TODO update actual API route/api/user.js line 394
//Accept friend request

//Deny friend request
export const denyFriendRequest = async(userId) => {
    try {
        let result = await axios.delete('/api/user/' + userId + '/deleteFriendRequest');
        return result;
    } catch(e) {
        console.log(error);
    }

    
}

//Create group request
export const createGroupRequest = async(userId, groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Deny group request
export const denyGroupRequest = async(userId, groupId) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Update Settings
export const updateSettings = async(userId, settings) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Update profile picture
export const updateProfilePicture = async(userId, image) => {
    try {

    } catch(e) {
        console.log(e);
    }
}

//Get all user events
export const getUserEvents = async(userId) => {
    try {
        let events = await axios.get('/api/');
        return events;
    } catch(e) {
        console.log(e);
    }
}
//Create user event
export const createUserEvent = async(userId, event) => {
    try {
        let result = await axios.post('/api/user/' + userId + '/updateEvent', event);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Update user event
export const updateUserEvent = async(userId, eventId, event) => {
    try {
        let result = await axios.put('/api/user/' + userId + '/updateEvent/' + eventId, event);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Delete user event
export const deleteUserEvent = async(userId, eventId) => {
    try {
        let result = await axios.delete('/api/user/' + userId + '/deleteEvent/' + eventId);
        return result;
    } catch(e) {
        console.log(e);
    }

}

//Get all groups
export const getUserGroups = async(userId) => {
    try {
        let groups = await axios.get('/api/user/' + userId + 'groups');
        return groups;
    } catch(e) {
        console.log(e);
    }
}

//Get all friends events
export const getFriendsEvents = async(userId) => {
    try {
        let friendsEvents = await axios.get('/api/user/' + userId + '/friends/events');
        return friendsEvents;
    } catch (e) {
        console.log(e);
    }
}

//Get all groups events
export const getGroupEvents = async(userId) => {
    try {
        let groupEvents = await axios.get('/api/user/' + userId + '/groups/events');
        return groupEvents;
    } catch(e) {
        console.log(e);
    }
}

