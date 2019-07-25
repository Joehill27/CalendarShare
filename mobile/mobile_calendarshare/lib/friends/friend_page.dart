import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_calendarshare/friends/ui/frienddetails/friend_details_page.dart';
import 'package:mobile_calendarshare/friends/ui/friends/friend.dart';
import '../helper_functions/json_parsing.dart';
import '../class_models/user_model.dart';
import '../api_calls/user_api_calls.dart';

class FriendsListPage extends StatefulWidget {
  FriendsListPage(this.username, this.userId);

  final String username;
  final String userId;

  @override
  _FriendsListPageState createState() => new _FriendsListPageState();
}

class _FriendsListPageState extends State<FriendsListPage> {
  List<Friend> _friends = [];
  List<User> friendRequests = [];
  List<User> friends = [];

  @override
  void initState() {
    super.initState();
    _loadFriends();
    _loadFriendRequests();
    _getFriends();
  }

  Future<void> _loadFriendRequests() async {
    List<User> tempUsers = [];
    var userResponse = await UserApi.getUser(widget.username);
    User user = JsonParsing.getUserFromRequest(userResponse);
    List temp = user.friendRequests;
    for(Map<String, dynamic> user in temp) {
      String userId = user['from'];
      String userJson = await UserApi.getUserById(userId);
      Map<String, dynamic> outerUser = jsonDecode(userJson);
      User u = new User.fromJson(outerUser['user']);
      print('Look a friend request' + u.toString());
      tempUsers.add(u);
    }
    setState(() {
      friendRequests = tempUsers;
    });
  }

  Future<void> _getFriends() async {
    List<User> tempUsers = [];
    var userResponse = await UserApi.getUser(widget.username);
    User user = JsonParsing.getUserFromRequest(userResponse);
    List temp = user.friends;
    for(Map<String, dynamic> user in temp) {
      String userId = user['friendId'];
      String userJson = await UserApi.getUserById(userId);
      Map<String, dynamic> outerUser = jsonDecode(userJson);
      User u = new User.fromJson(outerUser['user']);
      print('Look a friend' + u.toString());
      tempUsers.add(u);
    }
    print(tempUsers.toString());
    setState(() {
      friends = tempUsers;
    });
  }

  Future<void> _loadFriends() async {
    http.Response response =
    await http.get('https://randomuser.me/api/?results=25');

    setState(() {
      _friends = Friend.allFromResponse(response.body);
    });
  }

  Widget _buildFriendListTile(BuildContext context, int index) {
    var friend = _friends[index];
    Divider();
    return new ListTile(
      onTap: () => _navigateToFriendDetails(friend, index),
      leading: new Hero(
        tag: index,
        child: new CircleAvatar(
          backgroundImage: new NetworkImage(friend.avatar),
        ),
      ),
      title: new Text(friend.name, style: TextStyle(color: Colors.white),),
      subtitle: new Text(friend.email, style: TextStyle(color: Colors.white30),),
    );
   
  }

  void _navigateToFriendDetails(Friend friend, Object avatarTag) {
    Navigator.of(context).push(
      new MaterialPageRoute(
        builder: (c) {
          return new FriendDetailsPage(friend, avatarTag: avatarTag);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget content;

    if (_friends.isEmpty) {
      content = new Center(
        child: new CircularProgressIndicator(),
      );
    } else {
      content = new ListView.builder(
        itemCount: _friends.length,
        itemBuilder: _buildFriendListTile,
      );
    }

    return new Scaffold(
      backgroundColor: Colors.blueGrey[800],
      appBar: new AppBar(title: new Text('Friends'),
      centerTitle: true,
      backgroundColor: Colors.blueGrey[600],
      ),
      body: content,
    );
  }
}
