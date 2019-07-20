import 'dart:convert';

//TODO figure out storing objects versus storing JSON Objects
//AKA Group object versus JSON representation of group
class User {
  String id, email, username, password, events, friends, groups,
    friendRequests, groupRequests, profilePicture, settings;

  User.detailed(this.id, this.email, this.username, this.password,
      this.events, this.friends, this.groups, this.friendRequests,
      this.groupRequests, this.profilePicture, this.settings);

  User.fromJson(Map<String, dynamic> json) :
        id = json['_id'],
        email = json['email'],
        username = json['username'],
        password = json['password'],
        events = json['events'],
        friends = json['friends'],
        groups = json['groups'],
        friendRequests = json['friendRequests'],
        groupRequests = json['groupRequests'],
        profilePicture = json['profilePicture'],
        settings = json['settings'];

  toJSon() {
    return {
      "id": id,
      "email": email,
      "username": username,
      "password": password,
      "events": events,
      "friends": friends,
      "groups": groups,
      "friendRequests": friendRequests,
      "groupRequests": groupRequests,
      "profilePicture": profilePicture,
      "settings": settings
    };
  }

  //TODO
  getPicture() {

  }
}