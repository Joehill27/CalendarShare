import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile_calendarshare/user_registration.dart';
import 'stacked_icons.dart';
import 'home.dart';
import './api_calls/user_api_calls.dart';
import './helper_functions/encrypt.dart';
import 'dart:convert';
import './class_models/event_model.dart';
import './class_models/user_model.dart';
import './helper_functions/json_parsing.dart';

class LoginPage extends StatefulWidget {
  LoginPage({this.loggedIn});

  var loggedIn;

  @override
  State<StatefulWidget> createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _username;
  String _password;
  String _errorMessage;
  String _userId;
  User _user;
  String _profilePicture;
  List<Event> _events;
  List<Event> _groupEvents;
  var _loggedIn = false;


  _login() async {
    String encryptedPassword = Encrypt.encryptString('admin', 'Kaijoe22!');
    var userJson = await UserApi.loginRequest('admin');
    Map<String, dynamic> userOuter = jsonDecode(userJson);
    if (userOuter.containsKey('error')) {
      if (userOuter['error'] != '') {
        print('Oops theres an error:' + userOuter['error']);
        _errorMessage = "Invalid username or password";
      }
    } else {
      Map<String, dynamic> user = userOuter['user'];
      if (user['password'] != encryptedPassword) {
        _errorMessage = "Invalid username or password";
        print(_errorMessage);
      } else {
        _userId = user['_id'];
        _username = user['username'];
        List eventsVar = user['events'];
        _events = new List();
        for (var e in eventsVar) {
          _events.add(Event.fromJson(e));
        }
        var userRequest = await UserApi.getUser('admin');
        _user = JsonParsing.getUserFromRequest(userRequest);
        _profilePicture = user['profilePicture'];
        List groups = _user.groups;
        _groupEvents = await JsonParsing.getGroupEventsFromIds(_user.groups);
        print(_groupEvents.toString());
        _loggedIn = true;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark.copyWith(
      statusBarColor: Colors.blue, //or set color with: Color(0xFF0000FF)
    ));

    if (_loggedIn) {
      print('Logging in!');
      return new HomePage(
        userId: _userId,
        username: _username,
        user: _user,
        events: _events,
      );
    } else {
      print('Not logging in');
      return new Scaffold(
        backgroundColor: Colors.blueGrey[800],
        appBar: new AppBar(
            backgroundColor: Colors.transparent,
            elevation: 0.0,
            iconTheme: new IconThemeData(color: Color(0xFF18D191))),
        body: Container(
          width: double.infinity,
          child: new Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              new StakedIcons(),
              new Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.only(top: 0.0, bottom: 40.0),
                    child: new Text(
                      "Calendar Share",
                      style: new TextStyle(fontSize: 30.0, color: Colors.white),
                    ),
                  )
                ],
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0.0),
                child: new TextField(
                  decoration: new InputDecoration(
                    labelText: 'Username',
                    labelStyle: TextStyle(color: Colors.white),
                  ),
                  style: TextStyle(color: Colors.white),
                ),
              ),
              new SizedBox(
                height: 10.0,
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0.0),
                child: new TextField(
                  obscureText: true,
                  decoration: new InputDecoration(
                    labelText: 'Password',
                    labelStyle: TextStyle(color: Colors.white),
                  ),
                  style: TextStyle(color: Colors.white, decorationColor: Colors.white),
                ),
              ),
              new Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(
                          left: 20.0, right: 20.0, top: 10.0),
//                      onTap: () {
//                        Navigator.push(context, MaterialPageRoute(
//                            builder: (context) => HomePage(userId: _userId)
//                        ));
//                      },
                      child: new Container(
                        alignment: Alignment.center,
                        height: 60.0,
                        decoration: new BoxDecoration(
                            color: Colors.cyanAccent[700],
                            borderRadius: new BorderRadius.circular(9.0)),
                        child: new FlatButton(
                            child: new Text("Login",
                                style: new TextStyle(
                                    fontSize: 20.0, color: Colors.white)),
                            onPressed: () {
                              _login();
                              if (_loggedIn) {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => HomePage(
                                        user: _user,
                                        userId: _userId,
                                        username: _username,
                                        events: _events,
                                        groupEvents: _groupEvents
                              //          profilePicture: _profilePicture,
                                      ),
                                    ));
                              }
                            }),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(
                          left: 30.0, right: 20.0, top: 0.0),
                      child: new Container(
                          alignment: Alignment.center,
                          height: 30.0,
                          child: new Text("Forgot Password?",
                              style: new TextStyle(
                                  fontSize: 12.0, color: Colors.white))),
                    ),
                  )
                ],
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Padding(
                        padding: const EdgeInsets.only(bottom: 18.0),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => UserRegistration(),
                                ));
                          },
                          child: new Text(
                            "Create Account?",
                            style: TextStyle(color: Colors.white),
                          ),
                        ))
                  ],
                ),
              )
            ],
          ),
        ),
      );
    }
  }
}
