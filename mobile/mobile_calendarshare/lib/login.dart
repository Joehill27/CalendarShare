import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'stacked_icons.dart';
import 'home.dart';
import './api_calls/user_api_calls.dart';
import './helper_functions/encrypt.dart';
import 'dart:convert';
import './class_models/event_model.dart';
import './helper_functions/json_parsing.dart';

class LoginPage extends StatefulWidget {
  LoginPage();

  @override
  State<StatefulWidget> createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  String _username;
  String _password;
  String _errorMessage;
  String _userId;
  String _loggedIn = 'false';
  String _user;
  List<Event> _events;


  _login() async {

    String encryptedPassword = Encrypt.encryptString('admin', 'Kaijoe22!');
    var userJson = await UserApi.loginRequest('admin');
    Map<String, dynamic> userOuter = jsonDecode(userJson);
    if(userOuter.containsKey('error')) {
      if(userOuter['error'] != '') {
        print('Oops theres an error:' + userOuter['error']);
        _errorMessage = "Invalid username or password";
      }
    } else {
      Map<String, dynamic> user = userOuter['user'];
      if(user['password'] != encryptedPassword) {
        _errorMessage = "Invalid username or password";
        print(_errorMessage);
      } else {
        _userId = user['_id'];
        _username = user['username'];
        List eventsVar = user['events'];
        _events = new List();
        for(var e in eventsVar) {
          _events.add(Event.fromJson(e));
          print('Printing events' + e.toString());
        }
        _user = user.toString();
        _loggedIn = 'true';
      }
    }

  }
  
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark.copyWith(
      statusBarColor: Colors.blue, //or set color with: Color(0xFF0000FF)
    ));

    switch (_loggedIn) {
      case 'true':
        return new HomePage(
          userId: _userId,
          username: _username,
          user: _user,
          events: _events,
        );
      default:
    return new Scaffold(
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
                    style: new TextStyle(fontSize: 30.0),
                  ),
                )
              ],
            ),
            Padding(
              padding:
              const EdgeInsets.symmetric(horizontal: 20.0, vertical: 0.0),
              child: new TextField(
                decoration: new InputDecoration(labelText: 'Username'),
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
                decoration: new InputDecoration(labelText: 'Password'),
              ),
            ),
            new Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(
                        left: 20.0, right: 20.0, top: 10.0),
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                            builder: (context) => HomePage(userId: _userId)
                        ));
                      },
                      child: new Container(
                        alignment: Alignment.center,
                        height: 60.0,
                        decoration: new BoxDecoration(
                            color: Color(0xFF18D191),
                            borderRadius: new BorderRadius.circular(9.0)),
                        child: new FlatButton(
                          child: new Text(
                              "Login",
                              style: new TextStyle(
                                  fontSize: 20.0, color: Colors.white)
                          ),
                          onPressed: _login,
                        ),
                      ),

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
                                fontSize: 12.0, color: Color(0xFF18D191)))),
                  ),
                )
              ],
            ),
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.only(bottom: 18.0),
                    child: new Text(
                        "Create A New Account ", style: new TextStyle(
                        fontSize: 17.0,
                        color: Color(0xFF18D191),
                        fontWeight: FontWeight.bold)),
                  ),
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