import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile_calendarshare/event_card.dart';
import 'package:mobile_calendarshare/event_detail_page.dart';
import 'package:mobile_calendarshare/friend_page.dart';
import './class_models/user_model.dart';
import 'package:mobile_calendarshare/class_models/event_model.dart';
import 'package:mobile_calendarshare/past_events.dart';
import 'package:mobile_calendarshare/new_event_form.dart';
import './api_calls/user_api_calls.dart';
import './helper_functions/convert_time.dart';


import 'my_event_list.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title,
    this.userId, this.username, this.user, this.events}) : super(key: key);

  final String title;
  final String userId;
  final String username;
  String user;
  List<Event> events;

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _bottomNavIndex=0;

  List<Event> pastEvents;
  List<Event> initialEvents;
  List<Event> groupEvents;
  List<Event> userEvents;
  User user;

  _splitEventList() {
    DateTime now = DateTime.now();
    if(widget.events.length > 0) {
      for (Event event in initialEvents) {
        if (DateTime.parse(event.startDate).isAfter(now)) {
          userEvents.add(event);
        } else {
          pastEvents.add(event);
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
    print(initialEvents.toString());
    _splitEventList();
  }

//final userEvents = <Event>[]
//  ..add(new Event('Concert', 'Amway Center', 'Biggest Hits of 2019'))
//  ..add(new Event('Family Reunion', 'Magic Kingdom', 'Smiths 11th Annual Disney Get-Together'))
//  ..add(new Event('Concert', 'Amway Center', 'Biggest s of 2019'))
//  ..add(new Event('Pool Party', 'Glen\'s Place', 'Summer\'s Hottest Event'));

final initialGroupEvents = <Event>[]
  ..add(new Event('Musical', 'Amway Center', 'Biggest Hits of 2019'))
  ..add(new Event('Disney Day', 'Magic Kingdom', 'Smiths 11th Annual Disney Get-Together'))
  ..add(new Event('Magics Game', 'Amway Center', 'Biggest hits of 2019'))
  ..add(new Event('Study PARTY', 'Glen\'s Place', 'Summer\'s Hottest Event'));

  @override
  Widget build(BuildContext context) {
    var key = new GlobalKey<ScaffoldState>();
    return new Scaffold(
      backgroundColor: Colors.cyan[900],
      key:  key,
      
      appBar: new AppBar(
          backgroundColor: Colors.lightBlue[900],
          elevation: 0.0,
           title: new Container(
          
            child: new Row(
           //   mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
              
              CircleAvatar(
                
                backgroundImage: ExactAssetImage('assets/images/logo.png'),
                minRadius: 5,
                maxRadius: 20,),
                Align(alignment: Alignment.centerRight,),
              new SizedBox(
                width: 5,
              ),
              Text("Welcome, " + widget.username, style: TextStyle(color: Colors.white), ),
              new SizedBox(
                width: 45,
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
            
              PopupMenuButton(
                
                itemBuilder: (context) => [
                
                PopupMenuItem(
                  child: Row(children: <Widget>[
                    Icon(Icons.person_pin),
                    SizedBox(
                      width: 7,
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => FriendsPage(),
                         )
                       );
                      }, 
                        child: new Text("Friends"),
                     ),
                    ]
                  )
                ),
                
                PopupMenuItem(
                  
                  child: Row(children: <Widget>[
                    Icon(Icons.group),
                    SizedBox(
                      width: 7,
                    ),
                    GestureDetector(
                      
                      child: new Text("Groups"),
                    ),
                  ],
                )
              ),
                
                PopupMenuItem(
                  child: Row(children: <Widget>[
                    Icon(Icons.search),
                    SizedBox(
                      width: 7,
                    ),
                    GestureDetector(
                      
                      child: new Text("Search"),
                    ),
                  ],
                )
              ),

                PopupMenuItem(
                  child: Row(children: <Widget>[
                    Icon(Icons.power_settings_new),
                    SizedBox(
                      width: 7,
                    ),
                    GestureDetector(
                      
                      child: new Text("Logout"),
                    ),
                  ],
                )
              ),
              ],
            )
              ],
              ),
        ],
       )
      ),
            automaticallyImplyLeading: false,
      ),

      body: new ListView(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15.0),
          child: new Container(
              child: new Column(
            children: <Widget>[
              
              new SizedBox(
                height: 30.0,
              ),


            new SizedBox(
                height: 10.0,
              ),
              new Container(
              alignment: Alignment.bottomLeft,
              child: new Text("My Events", style: new TextStyle(
                fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.white,)
              
              )),
               
              
              Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.5,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: userEvents.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .7,
                child: Card(
                  child: Column(children: [ListTile(
                    onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => EventDetailPage(userEvents[index]),
                        ));
                      },
                    title: Text(userEvents[index].name),
                    subtitle: Text(userEvents[index].type),
                    leading: Icon(Icons.event,
                    color: Colors.blue,
                    ),
                  ),
                  Divider(),
                  ListTile(
                    title: Text(TimeFunctions.convertToEventFormat(
                        userEvents[index].startDate),
                        style: TextStyle(fontWeight: FontWeight.w500)),
                    leading: Icon(
                      Icons.calendar_today,
                      color: Colors.blue[500],
                    ),
                  ),
                  ListTile(
                    title: Text(TimeFunctions.convertToEventFormat(
                        userEvents[index].endDate),
                        style: TextStyle(fontWeight: FontWeight.w500)),
                    leading: Icon(
                      Icons.calendar_today,
                      color: Colors.blue[500],
                    ),
                  ),

                ],
              ),
            )
          );
            }
        )
              ),    
                            

      Container(
                alignment: Alignment.centerRight,
                child: FlatButton.icon(
                  
                  color: Colors.transparent,
                  icon: Icon(Icons.add, color: Colors.white,), //`Icon` to display
          label: Text('Add an Event', style: new TextStyle(fontSize: 10.0, color: Colors.white)),
           //`Text` to display
           onPressed: () async {
            Event newEvent = await Navigator.of(context).push(new MaterialPageRoute(
                          builder: (context){ return new AddEventFormPage();
                          }
                        ),
                        );
                if (newEvent != null) {
                userEvents.add(newEvent);
    }
          },
        )
                ),       
                                 
                    
              new SizedBox(
                height: 15.0,
              ),
              new Container(
              alignment: Alignment.centerLeft,
              child: new Text("Group Events", style: new TextStyle(
                fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.white,)
            
              )),
              Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.5,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: initialGroupEvents.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .7,
                child: Card(
                  child: Column(children: [ListTile(
                    onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => EventDetailPage(initialGroupEvents[index]),
                        ));
                      },
                    title: Text(initialGroupEvents[index].name),
                    subtitle: Text(initialGroupEvents[index].location),
                    leading: Icon(Icons.event,
                    color: Colors.blue,
                    ),
                  ),
                  Divider(),
                  ListTile(
                    
            title: Text('(408) 555-1212',
                style: TextStyle(fontWeight: FontWeight.w500)), 
            leading: Icon(
              Icons.contact_phone,
              color: Colors.blue[500],
            ),
          ),
          ListTile(
            title: Text('costa@example.com'),
            leading: Icon(
              Icons.contact_mail,
              color: Colors.blue[500],
            ),
          ),

                ],
              ),
            )
          );
            }
        )
              ),


          new SizedBox(
            height: 0.0,
          ),      
          Container(
                alignment: Alignment.centerRight,
                child: FlatButton.icon(
                  
                  color: Colors.transparent,
                  icon: Icon(Icons.add, color: Colors.white), //`Icon` to display
          label: Text('Add an Event', style: new TextStyle(fontSize: 10.0, color: Colors.white)),
           //`Text` to display
           onPressed: () async {
            Event newEvent = await Navigator.of(context).push(new MaterialPageRoute(
                          builder: (context){ return new AddEventFormPage();
                          }
                        ),
                        );
                if (newEvent != null) {
                initialGroupEvents.add(newEvent);
    }
          },
        )
                ),
              
             
              new SizedBox(
                height: 25.0,
              ),
              new Container(
              alignment: Alignment.centerLeft,
              child: new Text("Past Events", style: new TextStyle(
                fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.white,)
            
              )),
             Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.5,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: pastEvents.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .7,
                child: Card(
                  child: Column(children: [ListTile(
                    onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => EventDetailPage(pastEvents[index]),
                        ));
                      },
                    title: Text(pastEvents[index].name),
                    subtitle: Text(pastEvents[index].type),
                    leading: Icon(Icons.event,
                    color: Colors.blue,
                    ),
                  ),
                  Divider(),
                  ListTile(
                    title: Text(TimeFunctions.convertToEventFormat(
                        pastEvents[index].startDate),
                        style: TextStyle(fontWeight: FontWeight.w500)),
                    leading: Icon(
                      Icons.calendar_today,
                      color: Colors.blue[500],
                    ),
                  ),
                  ListTile(
                    title: Text(TimeFunctions.convertToEventFormat(
                        pastEvents[index].endDate),
                        style: TextStyle(fontWeight: FontWeight.w500)),
                    leading: Icon(
                      Icons.calendar_today,
                      color: Colors.blue[500],
                    ),
                  ),

                ],
              ),
            )
          );
            }
        )
              ),


          new SizedBox(
            height: 0.0,
          ),      
          Container(
                alignment: Alignment.centerRight,
                child: FlatButton.icon(
                  
                  color: Colors.transparent,
                  icon: Icon(Icons.add, color: Colors.white,), //`Icon` to display
          label: Text('Add an Event', style: new TextStyle(fontSize: 10.0, color: Colors.white)),
           //`Text` to display
           onPressed: () async {
            Event newEvent = await Navigator.of(context).push(new MaterialPageRoute(
                          builder: (context){ return new AddEventFormPage();
                          }
                        ),
                        );
                if (newEvent != null) {
                pastEvents.add(newEvent);
    }
          },
        )
                ),
  
              
             
              new SizedBox(
                height: 10.0,
              ),
              Row(
               ),
              
          
            ],
          )),
        )
      ],
    ),
    );
  }
}

