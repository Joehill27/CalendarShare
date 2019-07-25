import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/group_detail_page.dart';
import './class_models/group_model.dart';
import './api_calls/user_api_calls.dart';
import './api_calls/group_api_calls.dart';
import './class_models/user_model.dart';
import './helper_functions/json_parsing.dart';
import 'dart:convert';


class GroupPage extends StatefulWidget{
  GroupPage(this.username, this.userId);

  final String username;
  final String userId;

  @override
  _GroupPageState createState() => new _GroupPageState();
}

class _GroupPageState extends State<GroupPage> {

 List<Group> groups = [];
 List <Group> groupInvites = [];

 @override
 void initState() {
   super.initState();
   _loadGroups();
   _loadGroupRequest();

 }

 Future<void> _loadGroups() async {
   List<Group> tempGroups = [];
   var userResponse = await UserApi.getUser(widget.username);
   User user = JsonParsing.getUserFromRequest(userResponse);
   List temp = user.groups;
   for(Map<String, dynamic> group in temp) {
     String groupId = group['_id'];
     String groupJson = await GroupAPi.getGroup(groupId);
     Map<String, dynamic> outerGroup = jsonDecode(groupJson);
     Group g = new Group.fromJson(outerGroup['group']);
     tempGroups.add(g);
   }
   setState(() {
     groups = tempGroups;
   });
 }

 Future<void> _loadGroupRequest() async {
   List<Group> tempGroups = [];
   var userResponse = await UserApi.getUser(widget.username);
   User user = JsonParsing.getUserFromRequest(userResponse);
   List temp = user.groupRequests;
//   print(temp.toString());
   if(temp.length > 0) {
     for(Map<String, dynamic> group in temp) {
       String groupId = group['from'];
//       print('Here is the group id!' + groupId);
       String groupJson = await GroupAPi.getGroup(groupId);
//       print('group json' + groupJson);
       Map<String, dynamic> outerGroup = jsonDecode(groupJson);
//       print('outer group' + outerGroup.toString());
       Group g = new Group.fromJson(outerGroup['group']);
       tempGroups.add(g);
     }
   }
   setState(() {
     groupInvites = tempGroups;
   });
 }

  @override
  Widget build(BuildContext context) {

    return new Scaffold(
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
                                title: Text("Events: ",
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
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(5))),
                                color: Colors.blueAccent[100],
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
                              color: Colors.redAccent[100],
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(5))),
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
      Divider(color: Colors.red,),
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
            itemCount: groups.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .7,
                child: Card(
                  child: Column(children: [ListTile(
                    onTap: (){
                      Navigator.push(context, MaterialPageRoute(
                          builder: (context) => GroupDetailPage(groups[index]),
                         )
                       );
                    },
                    title: Text(groups[index].groupName, style: TextStyle(fontSize: 18, )),
                    leading: Icon(Icons.group_add,
                    color: Colors.blue,
                    ),
                  ),
                  Divider(),
                  ListTile(
                    title: Text("Members: "),
                    leading: Icon(Icons.card_membership),
                  ),
                  Divider(),
                  ListTile(
                    title: Text("Events: ",
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