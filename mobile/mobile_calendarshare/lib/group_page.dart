import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/group_detail_page.dart';
import 'stacked_icons.dart';
import 'home.dart';
import './class_models/group_model.dart';
import './api_calls/user_api_calls.dart';
import './api_calls/group_api_calls.dart';
import './class_models/user_model.dart';
import './helper_functions/json_parsing.dart';


class GroupPage extends StatefulWidget{
  GroupPage(this.username, this.userId);

  final String username;
  final String userId;

  @override
  _GroupPageState createState() => new _GroupPageState();
}

class _GroupPageState extends State<GroupPage> {

  
 final groupInvites = <Group>[];

 final initialGroups = <Group>[];
 List<Group> groups = [];
 List groupRequests = [];

 @override
 void initState() {
   super.initState();
   _loadGroups();
//   _loadGroupRequest();

 }

 Future<void> _loadGroups() async {
   var userResponse = await UserApi.getUser(widget.username);
   User user = JsonParsing.getUserFromRequest(userResponse);
   List tempGroups = user.groups;
   print('Number of groups' + tempGroups.toString());
   for(Map<String, dynamic> group in tempGroups) {
     print('Printing group name ' + group['groupName'].toString());
     groups.add(new Group.fromJson(group));
   }

 }

 Future<void> _loadGroupRequest() async {
   List temp = await UserApi.getUser(widget.username);
   setState(() {
     groupRequests = temp;
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
                    title: Text("Group Name", style: TextStyle(fontSize: 18, )),
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