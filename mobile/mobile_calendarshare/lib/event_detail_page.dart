import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/class_models/event_model.dart';
import 'package:mobile_calendarshare/helper_functions/convert_time.dart';
import './api_calls/user_api_calls.dart';

class EventDetailPage extends StatefulWidget {
  final Event event;
  final String userId;

  EventDetailPage(this.userId ,this.event);

  @override
  _EventDetailPageState createState() => new _EventDetailPageState();
}

class _EventDetailPageState extends State<EventDetailPage> {

  _deleteEvent() async {
    var result = await UserApi.deleteUserEvent(widget.userId, widget.event.id);
    Navigator.of(context).pop();

  }

  Widget get eventProfile {
    return new Container(
      padding: new EdgeInsets.symmetric(vertical: 15.0),
      decoration: new BoxDecoration(
        color: Colors.blueGrey[900],
      ),
      child: new Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image(
            image: AssetImage('assets/images/friends.png'),
          ),
          new SizedBox(
            height: 10,
          ),
          new Container(
              //   width: MediaQuery.of(context).size.width *.8,
              //    height: MediaQuery.of(context).size.height *.5,
              margin: const EdgeInsets.all(30.0),
              padding: const EdgeInsets.all(10.0),
              decoration: new BoxDecoration(
                  border: Border.all(color: Colors.black),
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(5.0))),
              child: Column(
                children: <Widget>[
                  Text(
                    widget.event.name,
                    style: TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.bold,
                        fontStyle: FontStyle.italic),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Icon(Icons.access_time),
                          SizedBox(
                            width: 10,
                          ),
                          Container(
                            child: Expanded(
                              child: Text(TimeFunctions.convertToEventFormat(
                                      widget.event.startDate) +
                                  " - " +
                                  TimeFunctions.convertToEventFormat(
                                      widget.event.endDate)),
                            ),
                          )
                        ],
                      )
                    ],
                  ),

                  SizedBox(
                    height: 10.0,
                  ),

//THIS ONE NEEDS TO BE CHANGED TO TIME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                  Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Icon(Icons.location_on),
                          SizedBox(
                            width: 10,
                          ),
                          Container(
                            child: Expanded(
                              child: Text(widget.event.type),
                            ),
                          )
                        ],
                      )
                    ],
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  Column(
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Icon(Icons.description),
                          SizedBox(
                            width: 10,
                          ),
                          Container(
                            child: Expanded(
                              child: Text(widget.event.description),
                            ),
                          )
                        ],
                      )
                    ],
                  ),

                  SizedBox(height: 50),
                  Row(
                    children: <Widget>[
                      FlatButton(
                        color: Colors.blue,
                        textColor: Colors.white,
                        disabledColor: Colors.grey,
                        disabledTextColor: Colors.black,
                        padding: EdgeInsets.all(8.0),
                        splashColor: Colors.blueAccent,
                        onPressed: () {
                          /*...*/
                        },
                        child: Text(
                          "Edit",
                          style: TextStyle(fontSize: 20.0),
                        ),
                      ),
                      SizedBox(
                        width: 10,
                      ),
                      FlatButton(
                        color: Colors.red,
                        textColor: Colors.white,
                        disabledColor: Colors.grey,
                        disabledTextColor: Colors.black,
                        padding: EdgeInsets.all(8.0),
                        splashColor: Colors.blueAccent,
                        onPressed: () {
                          _deleteEvent();
                        },
                        child: Text(
                          "Delete",
                          style: TextStyle(fontSize: 20.0),
                        ),
                      ),
                    ],
                  ),
                ],
              )),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.cyan[900],
      appBar: new AppBar(
        backgroundColor: Colors.blueGrey[600],
        centerTitle: true,
        title: new Text("Event"),
      ),
      body: new ListView(
        children: <Widget>[eventProfile],
      ),
    );
  }
}
