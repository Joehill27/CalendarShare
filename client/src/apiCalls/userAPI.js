import axios from "axios";
import {getGroupEvents} from './groupAPI';

let hostUrl = 'http://localhost:3001';

let groupEvents = [];
// let hostUrl = '';

//Get user
export const getUser = async(userName) => {
    try {
        let user = await axios.get(hostUrl + '/api/user/get/' + userName);
        return user.data.user;
    } catch(e) {
        console.log(e);
    }
}

export const getUserById = async(userId) => {
    try {
        let user = await axios.get(hostUrl + '/api/user/getById/' + userId);
        return user;
    } catch(e) {
        console.log(e);
    }
}

//Delete user
export const deleteUser = async(userId) => {
    try {
        let result = await axios.delete('/api/user/deleteAccount/'+userId);
        return result;
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

//Accept friend request
export const acceptFriendRequest = async(friendOne, friendTwo) => {
    let userId = friendOne.friendOneId;
    let request = {
        'friendOne': friendOne,
        'friendTwo': friendTwo
    }
    try {
        let result = await axios.post('/api/user/' + userId + 'addFriend', request);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Deny friend request
export const denyFriendRequest = async(userId) => {
    try {
        let result = await axios.delete('/api/user/' + userId + '/deleteFriendRequest');
        return result;
    } catch(e) {
        console.log(e);
    } 
}

//Create group request
export const createGroupRequest = async(userId, groupId) => {
    try {
        let result = await axios.post('/api/user/' + userId + '/createGroupRequest/' + groupId);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Accept group request

//Deny group request
export const denyGroupRequest = async(userId, groupId) => {
    try {
        let result = await axios.delete('/api/user/' + userId + '/deleteGroupRequest/' + groupId);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Update User Settings
export const updateUserSettings = async(userId, settings) => {
    try {
        let result = await axios.put('/api/user/' + userId + '/updateSettings',  settings);
        return result;
    } catch(e) {
        console.log(e);
    }
}

export const getProfilePicture = async(userId) => {
    try {
        let imageId = await axios.get('/api/user/'+userId+'/getProfilePicture');
        return imageId;
    } catch(e) {
        console.log(e);
    }
}

//Update profile picture
export const updateProfilePicture = async(userId, imageId) => {
    try {
        let result = await axios.put('/api/user/'+userId+'/updateProfilePicture', {'imageId': imageId});
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Get all user events
export const getUserEvents = async(userId) => {
    try {
        let events = await axios.get('/api/user/'+userId+'/events');
        return events;
    } catch(e) {
        console.log(e);
    }
}
//Create user event
export const createUserEvent = async(userId, event) => {
    try {
        let result = await axios.post(hostUrl+'/api/user/'+userId +'/createEvent', event);
        return result;
    } catch(e) {
        console.log(e);
    }
}

//Update user event
export const updateUserEvent = async(userId, eventId, event) => {
    try {
        let result = await axios.put(hostUrl+'/api/user/' + userId + '/updateEvent/' + eventId, event);
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

// Used to get the group events set before retrieving them (fixes an issue where getGroupEvents was returning an undefined over the completed array)
export const setUserGroupEvents = async(user) => {
    let groups = user.groups;
    // console.log(user);

    groups.forEach(group => {
        getGroupEvents(group._id)
        .then((events) => {
            events.forEach(event => {
                groupEvents.push(event);
            });
        })
        .then((err) => {
            // console.log(groupEvents);
        })
        .catch(e => console.log(e));
    });
}

// Returns the global that was set by setUserGroupEvents
export const getUserGroupEvents2 = async(user) => {
    return groupEvents;
}

//Get all groups events
export const getUserGroupEvents = async(user) => {

    let groups = user.groups;
    console.log(user);
    
    let groupEvents = [];

    groups.forEach(group => {
        getGroupEvents(group._id)
        .then((events) => {
            events.forEach(event => {
                groupEvents.push(event);
            });
        })
        .then((err) => {
            console.log(groupEvents);
            return groupEvents;
        })
        .catch(e => console.log(e));
    });
}
