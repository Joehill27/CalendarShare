import 'package:http/http.dart';
import '../class_models/event_model.dart';
import '../class_models/user_model.dart';
import '../class_models/group_model.dart';
import '../helper_functions/encrypt.dart';
import '../helper_functions/json_parsing.dart';
import '../api_calls/group_api_calls.dart';

void main(){


  _getGroupsTest() async {
    var userRequest = await UserApi.getUser('admin');
    User user = JsonParsing.getUserFromRequest(userRequest);
    List groupJson = user.groups;

    List<Event> events = await JsonParsing.getGroupEventsFromIds(user.groups);

    if(events != null) {
      for (Event event in events) {
        print(event.toString());
      }
    }
  }

  _getGroupsTest();

}

class UserApi {

  //Get all users
  static createAccountRequest(String username, String password, String email) async {
    String url = 'http://www.cop4331groupone.com/api/user/createAccount';

    String json = "";
    String encryptedPassword = Encrypt.encryptString(username, password);

    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '{"username":"' + username + '","password":"'
        + encryptedPassword + '","email":"' + email + '"}';

    print(request);
    try {
      response = await post(url, headers: headers, body: request);
    } catch (e) {
      print(e);
    } finally {
      if (response != null) {
        json = response.body;
        print(json);
      }
    }
    return json;
  }

  static getUserById(String userId) async {
    String url = 'http://www.cop4331groupone.com/api/user/getById/'+userId;
    String json = "";

    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    try {
      response = await get(url, headers: headers);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  static loginRequest(String username) async {
    String url = 'http://www.cop4331groupone.com/api/user/login';
    String password = "";
    String json = "";

    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '{"username":"' + username + '", "password":"' + password + '"}';
    print(request);
    try {
      response = await post(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  static getUser(String username) async {
    String url = 'http://www.cop4331groupone.com/api/user/get/'+username;
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await get(url, headers: headers);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //TODO figure out settings
  //Update User Settings
  static updateSettings(String userId, String settings) async {
    String url = 'http://www.cop4331groupone.com/api/user/'+userId+'/updateSettings';
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await put(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //TODO request
  //Create User Event
  static createEvent(String userId, Event event) async {
    String url = 'http://www.cop4331groupone.com/api/user/'+userId+'/createEvent';
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = event.toJson();
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //TODO request
  //Update User Event
  static updateEvent(String userId, Event event, String eventId) async {
    String url = 'http://www.cop4331groupone.com/api/user/'+userId+'/updateEvent/'+eventId;
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await put(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //Delete User Event
  static deleteUserEvent(String userId, String eventId) async {
    String url = 'http://www.cop4331groupone.com/api/user/'+userId+'/createEvent';
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await delete(url, headers: headers);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }


  //Get all User Group events
  static getEvents(String userId) async {
    String url = 'http://www.cop4331groupone.com/api/user/'+userId+'/events';
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await get(url, headers: headers);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }



  //Probably don't need this one
  //Get all User Friends events


  //Get all User friend requests

  //Get all User friends

  //TODO request
  //Create Friend Request
  static createFriendRequest(String userId, String requestedUserId) async {
    String url = 'http://cop4331groupone.com/api/user/'+userId+'/createFriendRequest';
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //Delete Friend Request
  static denyFriendRequest(String userId, String friendId) async {
    String url = 'http://cop4331groupone.com/api/user/'+userId+'/deleteFriendRequest/'+friendId;
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await delete(url, headers: headers);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //TODO Request
  //Accept Friend Request
  static acceptFriendRequest(String userId, friendOneName, friendTwoId, friendTwoName) async {
    String url = 'http://cop4331groupone.com/api/user/'+userId+'/addFriend';
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

  //Delete friend


  //Get all groups


  //Get all group invites

  //TODO request
  //Accept Group Request
  static acceptGroupInvite(String userId, String groupId, String memberPermission) async {
    String url = 'http://cop4331groupone.com/api/user/'+userId+'/acceptGroupRequest'+groupId;
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};
    String request = '';
    print(request);

    try {
      response = await post(url, headers: headers, body: request);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }


  //Deny Group Request
  static denyGroupInvite(String userId, String groupId) async {
    String url = 'http://cop4331groupone.com/api/user/'+userId+'/deleteGroupRequest/'+groupId;
    String json = "";
    Response response;
    Map<String, String> headers = {"Content-type": "application/json"};

    try {
      response = await delete(url, headers: headers);
    } catch(e) {
      print(e);
    } finally {
      if(response != null) {
        json = response.body;
      }
    }
    return json;
  }

}