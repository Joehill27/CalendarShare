import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'stacked_icons.dart';
import 'home.dart';


class Group{
  String groupName;
  int numEvents, members;

  Group(this.groupName, this.members, this.numEvents);
}

 class GroupPage extends StatelessWidget {

  
 final groupInvites = <Group>[]
 ..add(new Group("Test", 1, 2))
 ..add(new Group("Avengers", 7, 3))
 ..add(new Group("Area_51_Raiders", 251, 1))
 ..add(new Group("Non-humans", 3, 50))
 ..add(new Group("Jock", 15, 2))
 ..add(new Group("Homies", 5, 6))
 ..add(new Group("TMNT", 4, 1000))
 ..add(new Group("RANDOS", 4, 11));

 final initialGroups = <Group>[]
 ..add(new Group("Avengers", 7, 3))
 ..add(new Group("Area_51_Raiders", 251, 1))
 ..add(new Group("Non-humans", 3, 50))
 ..add(new Group("Jock", 15, 2))
 ..add(new Group("Homies", 5, 6))
 ..add(new Group("TMNT", 4, 1000))
 ..add(new Group("RANDOS", 4, 11));

  @override
  Widget build(BuildContext context) {
    
    return new Scaffold(
    key:  key,
    backgroundColor: Colors.blueGrey[900], 
      appBar: new AppBar(
          backgroundColor: Colors.blueGrey[600],
          elevation: 0.0, 
          title: Text("Groups"),       
      ),
      
      body: new ListView(      
        children: <Widget>[
          Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15.0),
          child: Container(
              child: new Column(
                children: <Widget>[
                  new SizedBox(
                  height: 30.0,
                  ),
              
                  Container(
                  alignment: Alignment.bottomLeft,
                  child: new Text("Group Invites", style: new TextStyle(
                    fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.white,)
                    ) 
                  ),
                  
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
                    height: MediaQuery.of(context).size.height * 0.4,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: groupInvites.length, itemBuilder: (context, index) {
                        return Container(
                          width: MediaQuery.of(context).size.width * .7,
                          child: Card(
                            child: Column(children: [ListTile(
                              title: Text(groupInvites[index].groupName, style: TextStyle(fontSize: 18, )),
                              leading: Icon(Icons.group_add,
                              color: Colors.blue,
                                ),
                              ),
                              Divider(),
                  
                              ListTile(
                                title: Text("Events: " + groupInvites[index].numEvents.toString(),
                                style: TextStyle(fontWeight: FontWeight.w500)), 
                                leading: Icon(
                                  Icons.event_available,
                                  color: Colors.blue[500],
                                  ),
                                ),
                              
                              Row(children: <Widget>[
                                SizedBox(
                                  width: 5,
                                ),
                                FlatButton(
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(7))),
                                color: Colors.green,
                                child: Row(children: <Widget>[
                                  Icon(Icons.check_box),
                                  Text("Join"),
                                  ],
                                ),
                                onPressed: (){
                                  //*** */
                                },
                              ),
                              Spacer(),
                              FlatButton(
                              color: Colors.red,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(7))),
                              child: Row(children: <Widget>[
                                Icon(Icons.delete_forever),
                                Text("Reject"),
                              ],
                            ),
                            onPressed: (){
                          },
                        ),
                        SizedBox(
                          width: 5,
                        ),
                      ],
                    )
                  ]
                ),
              )
            );
          }
        )
      ),
      SizedBox(
        height: 15,
      ),
      Container(
        alignment: Alignment.bottomLeft,
        child: new Text("My Groups", style: new TextStyle(
        fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.white,)
        )
      ),
      Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.45,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: initialGroups.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .7,
                child: Card(
                  child: Column(children: [ListTile(
                    title: Text(initialGroups[index].groupName, style: TextStyle(fontSize: 18, )),
                    leading: Icon(Icons.group_add,
                    color: Colors.blue,
                    ),
                  ),
                  Divider(),
                  ListTile(
                    title: Text("Members: " + initialGroups[index].members.toString()),
                    leading: Icon(Icons.card_membership),
                  ),
                  Divider(),
                  ListTile(
                    title: Text("Events: " + initialGroups[index].numEvents.toString(),
                    style: TextStyle(fontWeight: FontWeight.w500)), 
                    leading: Icon(
                      Icons.event_available,
                      color: Colors.blue[500],
                      ),
                    ),
                  ]
                ),
              )
            );
          }
        )
      ),
    ],
  )
),
  )
    ],
      ),
        );
          }
            }