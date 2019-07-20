import 'dart:convert';
import '../class_models/event_model.dart';
import '../class_models/user_model.dart';
import '../helper_functions/encrypt.dart';

class JsonParsing {

  static getEventsFromArray(eventsJson) {
    List<Event> eventObjects;
    Map<String, dynamic> events = jsonDecode(eventsJson);
    var eventsArray = events['events'];
    print('Here are the events!' + eventsArray.toString());
    for (Map<String, dynamic> event in eventsArray) {
      eventObjects.add(new Event.fromJson(event));
    }
  }

  static getGroupsFromArray(groupsJSon) {

  }

  static getGroupMembersFromArray(membersJson) {

  }

  static getFriendsFromArray(friendsJson) {

  }

  //Do I need this?
  static getFriendRequestsFromArray(fRequestsJson) {

  }

  //Do I need this?
  static getGroupInvitesFromArray(gInvitesJson) {

  }



}