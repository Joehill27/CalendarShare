import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

import 'package:mobile_calendarshare/class_models/event_model.dart';

class EventDetailPage extends StatefulWidget{
  final Event event;

  EventDetailPage(this.event);

  @override
  _EventDetailPageState createState() => new _EventDetailPageState();
}

class _EventDetailPageState extends State<EventDetailPage> {
  
  Widget get eventProfile {
    return new Container(
      padding: new EdgeInsets.symmetric(vertical: 15.0),
      decoration: new BoxDecoration(
        
        gradient: new LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          stops: [0.1, 0.5, 0.7, 0.9],
          colors: [
            Colors.indigo,
            Colors.indigo,
            Colors.indigo,
            Colors.indigo,
          ],
        ),
      ),
      child: new Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image(image: AssetImage('assets/images/friends.png'),),
          new SizedBox(
            height: 10,
          ),
          new Container(
          margin: const EdgeInsets.all(30.0),
          padding: const EdgeInsets.all(10.0),
          decoration: new BoxDecoration(border: Border.all(color: Colors.black), 
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(5.0))),
          child: Text(
            widget.event.name,
            style: new TextStyle(fontSize: 50.0, color: Colors.cyan[900]),
            textAlign: TextAlign.center,
          ),
          ),
          new Text(
            widget.event.type,
            style: new TextStyle(fontSize: 25.0, color: Colors.white),
          ),
          new Padding(
            padding:
                const EdgeInsets.symmetric(horizontal: 32.0, vertical: 60.0),
            child: new Text(widget.event.description, style: new TextStyle(
              fontSize: 16.0, color: Colors.white,), textAlign: TextAlign.start,),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.cyan[900],
      appBar: new AppBar(
        backgroundColor: Colors.cyanAccent[900],
        title: new Text('HomePage'),
      ),
      body: new ListView(
        children: <Widget>[eventProfile],
      ),
    );
  }
}