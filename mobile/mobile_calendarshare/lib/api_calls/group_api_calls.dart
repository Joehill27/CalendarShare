import 'package:http/http.dart';
import '../class_models/event_model.dart';
import '../class_models/group_model.dart';

class GroupAPi {

  //Get all groups
  static getAllGroups() async{
    String url = 'http://cop4331groupone.com/api/group/getGroups';
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await get(url, headers: headers);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }

  }

  //Create Group
  static createGroup(Group group, creatorId) async{
    String url = 'http://cop4331groupone.com/api/group/createGroup';
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = group.toJSon(group);
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Delete Group
  static deleteGroup(groupId) async {
    String url = 'http://cop4331groupone.com/api/group/'+ groupId;
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await delete(url, headers: headers);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Get Group events
  static getEvents(groupId) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+ '/getEvents';
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await get(url, headers: headers);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Create Group Event
  static createEvent(groupId, Event event) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/addEvent';
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = event.toJson();
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Update Group Event
  static updateEvent(groupId, Event event) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/updateEvent/'+event.id;
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = event.toJson();
    print(request);

    try {
      response = await put(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Delete Group Event
  static deleteEvent(groupId, eventId) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/deleteEvent/'+eventId;
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await delete(url, headers: headers);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Don't think I need this one
  //Add Group Member
  static addMember(groupId, String userId, String userName) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId;
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '{"userId":' + userId + ', "userName":' + userName + '}';
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Update Group Member
  static updateMember(groupId, userId, member) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/updateMember/'+userId;
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = member;
    print(request);

    try {
      response = await put(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Delete Group Member
  static deleteMember(groupId, userId) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/deleteMember/'+userId;
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await delete(url, headers: headers);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //TODO update when settings are decided on
  //Update Group Settings
  static updateSettings(groupId, settings) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/settings';
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = settings;
    print(request);

    try {
      response = await put(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

  //Update Group Picture
  static updatePicture(groupId, pictureId) async {
    String url = 'http://cop4331groupone.com/api/group/'+groupId+'/updateGroupPicture';
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = pictureId;
    print(request);

    try {
      response = await put(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        String json = response.body;
        print(json);
      }
    }
  }

}