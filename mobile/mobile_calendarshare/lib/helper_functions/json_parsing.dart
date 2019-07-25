import 'dart:convert';
import '../class_models/event_model.dart';
import '../class_models/user_model.dart';
import '../class_models/group_model.dart';
import '../api_calls/group_api_calls.dart';

class JsonParsing {

  static getUserFromRequest(var userRequest) {
    Map<String, dynamic> userOuter = jsonDecode(userRequest);
    Map<String, dynamic> user = userOuter['user'];
    return User.fromJson(user);
  }

  static getEventsFromArray(Map<String, dynamic> eventsJson) {
    print('Here is the events JSON!! ' + eventsJson.toString());
    List<Event> eventObjects;
    var eventsArray = eventsJson['events'];
    print('Here are the events!' + eventsArray.toString());
    for (Map<String, dynamic> event in eventsArray) {
      eventObjects.add(new Event.fromJson(event));
    }

    return eventObjects;
  }

  static getGroupsFromArray(Map <String, dynamic> groupsJson) {
    List<Group> groupObjects;
    var groupsArray = groupsJson['groups'];
    print('Here are the groups:' + groupsArray.toString());
    for(Map<String, dynamic> group in groupsArray) {
      groupObjects.add(new Group.fromJson(group));
    }
    return groupObjects;
  }

  static getGroupsFromIds(List groupJson) async{
    List<Group> groups = [];

    for(var group in groupJson) {
      var groupJson = await GroupAPi.getGroup(group['_id']);
      Map<String, dynamic> g = jsonDecode(groupJson);
      groups.add(new Group.fromJson(g));

    }
    return groups;
  }

  static getGroupEventsFromIds(List groupJson) async{
    List<Event> groupEvents = [];

    for(var group in groupJson) {
      var eventsJson = await GroupAPi.getEvents(group['_id']);
      Map<String, dynamic> e = jsonDecode(eventsJson);
      List events = e['events'];
//      print('Getting events for '+ group['_id']);
      if(events != null) {
        for (var event in events) {
//          print(event.toString());
          groupEvents.add(new Event.fromJson(event));
        }
      }
    }
    return groupEvents;
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