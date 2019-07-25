import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:http/http.dart';
import 'package:mobile_calendarshare/group_page.dart';
import './class_models/group_model.dart';
import 'package:mobile_calendarshare/search.dart';
 

class GroupDetailPage extends StatefulWidget{
  GroupDetailPage(this.group);

  final Group group;

  @override
  _GroupDetailPageState createState() => new _GroupDetailPageState();
}

class _GroupDetailPageState extends State<GroupDetailPage> {
  
  Widget get eventProfile {
    return new Container(
      padding: new EdgeInsets.symmetric(vertical: 15.0),
      decoration: new BoxDecoration(
        color: Colors.blueGrey[900],
      ),
      child: new Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
         CircleAvatar( 
          backgroundImage: AssetImage('assets/images/friends.png'),
          minRadius: 20,
          maxRadius: 90,
         ),
          new SizedBox(
            height: 10,
          ),
          new Container(
        //   width: MediaQuery.of(context).size.width *.8,
        //    height: MediaQuery.of(context).size.height *.5,
          margin: const EdgeInsets.all(5.0),
          padding: const EdgeInsets.all(20.0),
          decoration: new BoxDecoration(border: Border.all(color: Colors.black), 
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(5.0))),
          child: Column(children: <Widget>[
            Text("Group Name",
            style: TextStyle(
             fontSize: 25,
             fontWeight: FontWeight.bold,
             color: Colors.blue,
             )),
            SizedBox(
              height: 20,
            ),
            Column(children: <Widget>[
              Row(children: <Widget>[
                Icon(
                  Icons.people,
                  color: Colors.blue[900],
                  size: 35,
                  ),
                SizedBox(
                  width: 10,
                ),
                Container(child: Expanded(
                  child: Text("Current Members: " + widget.group.members.toString(),
                  style:TextStyle(fontSize: 15,
                  color: Colors.blue,
                  ),
                  ),
                ),)
              ],)
           
            ],),
            
            SizedBox(
              height: 20.0,
            ),
          
              Column(children: <Widget>[
              Row(children: <Widget>[
                Icon(Icons.event_available,
                color: Colors.blue[900],
                size: 35,
                ),
                SizedBox(
                  width: 10,
                ),
                Container(child: Expanded(
                child:  Text("Number of Events:",
                style: TextStyle(fontSize: 15,
                color: Colors.blue,
                ),
                ),
                ),)

                

              ],)
           
            ],),
           

            SizedBox(
              height: 50
            ),
            Row(children: <Widget>[
              FlatButton(
  color: Colors.blueAccent[100],
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(5))),
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

Spacer(),

FlatButton(
  
  color: Colors.greenAccent[400],
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(5))),
  textColor: Colors.white,
  disabledColor: Colors.grey,
  disabledTextColor: Colors.black,
  padding: EdgeInsets.all(8.0),
  
  splashColor: Colors.blueAccent,
  onPressed: () {
    Navigator.push(context, MaterialPageRoute(
                          builder: (context) => ListViewSearch(widget.group),
                         )
                       );
  },
  child: Text(
    "Invite",
    style: TextStyle(fontSize: 20.0),
  ),
),
Spacer(),
FlatButton(
  color: Colors.redAccent[400],
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(5))),
  textColor: Colors.white,
  disabledColor: Colors.grey,
  disabledTextColor: Colors.black,
  padding: EdgeInsets.all(8.0),
  splashColor: Colors.blueAccent,
  onPressed: () {
    //*** */
  },
  child: Text(
    "Delete",
    style: TextStyle(fontSize: 20.0),
  ),
),
            ],),
           
        
          ],)
          
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
        backgroundColor: Colors.blueGrey[600],
        centerTitle: true,
        title: new Text(" Group"),
      ),
      body: new ListView(
        children: <Widget>[eventProfile],
      ),
    );
  }
}