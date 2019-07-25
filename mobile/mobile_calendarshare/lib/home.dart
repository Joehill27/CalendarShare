import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/event_detail_page.dart';
import 'package:mobile_calendarshare/friends/friend_page.dart';
import 'package:mobile_calendarshare/group_page.dart';

import './class_models/user_model.dart';
import 'package:mobile_calendarshare/class_models/event_model.dart';
import 'package:mobile_calendarshare/new_event_form.dart';
import './helper_functions/convert_time.dart';
import './settings.dart';

class HomePage extends StatefulWidget {
  HomePage(
      {Key key,
      this.title,
      this.user,
      this.userId,
      this.username,
      this.events,
      this.groupEvents})
      : super(key: key);

  final String title;
  final String userId;
  final String username;
  final User user;
  final List<Event> events;
  final List<Event> groupEvents;

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Event> pastEvents;
  List<Event> initialEvents;
  List<Event> groupEvents;
  List<Event> userEvents;
  Map<String, dynamic> settings;
  User _user;

  _splitEventList() {
    DateTime now = DateTime.now();
    if (widget.events.length != null) {
      for (Event event in initialEvents) {
        print(event.startDate);
        if (DateTime.parse(event.startDate + 'Z').isAfter(now)) {
          userEvents.add(event);
        } else {
          pastEvents.add(event);
        }
      }
    } else {
      print('Event list is empty');
    }
  }

  _splitGroupEvents() {
    DateTime now = DateTime.now();
    List<Event> temp = widget.groupEvents;
//    groupEvents.removeWhere((event) => DateTime.parse(event.startDate+'Z').isBefore(now));

    if (widget.groupEvents != null) {
      for (Event event in temp) {
        if (DateTime.parse(event.startDate).isAfter(now)) {
          groupEvents.add(event);
        }
      }
    } else {
      print('Event list is empty');
    }
  }

  @override
  void initState() {
    super.initState();
    pastEvents = new List();
    groupEvents = new List();
    userEvents = new List();
    initialEvents = widget.events;
    _splitEventList();
    _splitGroupEvents();
    _user = widget.user;
    settings = _user.settings;
  }

  @override
  Widget build(BuildContext context) {
    var key = new GlobalKey<ScaffoldState>();
    return new Scaffold(
      backgroundColor: Colors.blueGrey[800],
      key: key,
      appBar: new AppBar(
        backgroundColor: Colors.blueGrey[600],
        elevation: 10.0,
        title: new Container(
            child: new Row(
          children: <Widget>[
            PopupMenuButton(
              icon: Icon(Icons.menu),
              itemBuilder: (context) => [
                PopupMenuItem(
                    child: ListTile(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => FriendsListPage(widget.username, widget.userId),
                        ));
                  },
                  leading: Icon(Icons.person),
                  title: Text("Friends"),
                )),
                PopupMenuItem(
                    child: ListTile(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => GroupPage(widget.username, widget.userId ),
                        ));
                  },
                  leading: Icon(Icons.group),
                  title: Text("Groups"),
                )),
                PopupMenuItem(
                    child: ListTile(
                  onTap: () async {
                    settings = await Navigator.of(context).push(
                      new MaterialPageRoute(builder: (context) {
                        return new SettingsPage(userId: widget.userId, settings: _user.settings,);
                      }),
                    );
                  },
                  leading: Icon(Icons.settings),
                  title: Text("Settings"),
                )),
                PopupMenuItem(
                    child: ListTile(
                  onTap: () {
                    Navigator.of(context).popUntil((route) => route.isFirst);
                  },
                  leading: Icon(Icons.power_settings_new),
                  title: Text("Logout"),
                )),
              ],
            ),
            Spacer(),
            CircleAvatar(
              backgroundImage: ExactAssetImage('assets/images/ironman.jpeg'),
              minRadius: 5,
              maxRadius: 20,
            ),
            new SizedBox(
              width: 10,
            ),
            Text(widget.username),
          ],
        )),
        automaticallyImplyLeading: false,
      ),
      body: new ListView(
        children: <Widget>[
          SizedBox(
            height: 20,
          ),
          
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15.0),
            child: new Container(
                child: new Column(
              children: <Widget>[
                new SizedBox(
                  height: 20.0,
                ),
                new SizedBox(
                  height: 10.0,
                ),
                new Container(
                    alignment: Alignment.bottomLeft,
                    child: new Text("My Events",
                        style: new TextStyle(
                          fontSize: 20.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ))),
                Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
                    height: MediaQuery.of(context).size.height * 0.5,
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: userEvents.length,
                        itemBuilder: (context, index) {
                          return Container(
                              width: MediaQuery.of(context).size.width * .7,
                              child: Card(
                                elevation: 20,
                                child: Column(
                                  children: [
                                    ListTile(
                                      onTap: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) =>
                                                  EventDetailPage(
                                                    widget.userId, userEvents[index])
                                            ));
                                      },
                                      title: Text(userEvents[index].name),
                                      subtitle: Text(userEvents[index].type),
                                      leading: Icon(
                                        Icons.event,
                                        color: Colors.blue,
                                      ),
                                    ),
                                    Divider(),
                                    ListTile(
                                      title: Text(
                                          TimeFunctions.convertToEventFormat(
                                              userEvents[index].startDate),
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500)),
                                      leading: Icon(
                                        Icons.calendar_today,
                                        color: Colors.blue[500],
                                      ),
                                    ),
                                    ListTile(
                                      title: Text(
                                          TimeFunctions.convertToEventFormat(
                                              userEvents[index].endDate),
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500)),
                                      leading: Icon(
                                        Icons.calendar_today,
                                        color: Colors.blue[500],
                                      ),
                                    ),
                                  ],
                                ),
                              ));
                        })),
                Container(
                    alignment: Alignment.centerRight,
                    child: FlatButton.icon(
                      color: Colors.transparent,
                      icon: Icon(
                        Icons.add,
                        color: Colors.white,
                      ), //`Icon` to display
                      label: Text('Add an Event',
                          style: new TextStyle(
                              fontSize: 10.0, color: Colors.white)),
                      //`Text` to display
                      onPressed: () async {
                        Event newEvent = await Navigator.of(context).push(
                          new MaterialPageRoute(builder: (context) {
                            return new AddEventFormPage();
                          }),
                        );
                        if (newEvent != null) {
                          userEvents.add(newEvent);
                        }
                      },
                    )),
                new SizedBox(
                  height: 15.0,
                ),
                new Container(
                    alignment: Alignment.centerLeft,
                    child: new Text("Group Events",
                        style: new TextStyle(
                          fontSize: 20.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ))),
                Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
                    height: MediaQuery.of(context).size.height * 0.5,
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: groupEvents.length,
                        itemBuilder: (context, index) {
                          return Container(
                              width: MediaQuery.of(context).size.width * .7,
                              child: Card(
                                child: Column(
                                  children: [
                                    ListTile(
                                      onTap: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) =>
                                                  EventDetailPage(
                                                    widget.userId,
                                                      groupEvents[index]),
                                            ));
                                      },
                                      title: Text(groupEvents[index].name),
                                      subtitle: Text(groupEvents[index].type),
                                      leading: Icon(
                                        Icons.event,
                                        color: Colors.blue,
                                      ),
                                    ),
                                    Divider(),
                                    ListTile(
                                      title: Text(
                                          TimeFunctions.convertToEventFormat(
                                              groupEvents[index].endDate),
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500)),
                                      leading: Icon(
                                        Icons.calendar_today,
                                        color: Colors.blue[500],
                                      ),
                                    ),
                                    ListTile(
                                      title: Text(
                                          TimeFunctions.convertToEventFormat(
                                              groupEvents[index].endDate),
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500)),
                                      leading: Icon(
                                        Icons.calendar_today,
                                        color: Colors.blue[500],
                                      ),
                                    ),
                                  ],
                                ),
                              ));
                        })),
                new SizedBox(
                  height: 0.0,
                ),
                Container(
                    alignment: Alignment.centerRight,
                    child: FlatButton.icon(
                      color: Colors.transparent,
                      icon: Icon(Icons.add,
                          color: Colors.white), //`Icon` to display
                      label: Text('Add an Event',
                          style: new TextStyle(
                              fontSize: 10.0, color: Colors.white)),
                      //`Text` to display
                      onPressed: () async {
                        Event newEvent = await Navigator.of(context).push(
                          new MaterialPageRoute(builder: (context) {
                            return new AddEventFormPage();
                          }),
                        );
                        if (newEvent != null) {
                          groupEvents.add(newEvent);
                        }
                      },
                    )),
                new SizedBox(
                  height: 25.0,
                ),
                new Container(
                    alignment: Alignment.centerLeft,
                    child: new Text("Past Events",
                        style: new TextStyle(
                          fontSize: 20.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ))),
                Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
                    height: MediaQuery.of(context).size.height * 0.5,
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: pastEvents.length,
                        itemBuilder: (context, index) {
                          return Container(
                              width: MediaQuery.of(context).size.width * .7,
                              child: Card(
                                child: Column(
                                  children: [
                                    ListTile(
                                      onTap: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) =>
                                                  EventDetailPage(
                                                    widget.userId,
                                                      pastEvents[index]),
                                            ));
                                      },
                                      title: Text(pastEvents[index].name),
                                      subtitle: Text(pastEvents[index].type),
                                      leading: Icon(
                                        Icons.event,
                                        color: Colors.blue,
                                      ),
                                    ),
                                    Divider(),
                                    ListTile(
                                      title: Text(
                                          TimeFunctions.convertToEventFormat(
                                              pastEvents[index].startDate),
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500)),
                                      leading: Icon(
                                        Icons.calendar_today,
                                        color: Colors.blue[500],
                                      ),
                                    ),
                                    ListTile(
                                      title: Text(
                                          TimeFunctions.convertToEventFormat(
                                              pastEvents[index].endDate),
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500)),
                                      leading: Icon(
                                        Icons.calendar_today,
                                        color: Colors.blue[500],
                                      ),
                                    ),
                                  ],
                                ),
                              ));
                        })),
                new SizedBox(
                  height: 10.0,
                ),
                Row(),
              ],
            )),
          )
        ],
      ),
    );
  }
}
