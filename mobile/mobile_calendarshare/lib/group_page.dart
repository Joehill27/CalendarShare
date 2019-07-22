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
      backgroundColor: Colors.teal[300],
      appBar: new AppBar(
        centerTitle: true,
        backgroundColor:Colors.transparent,
          elevation: 0.0,
          iconTheme: new IconThemeData(color: Color(0xFF18D191)),
          title: Text("My Groups"),
          ),
          
          body: new ListView(
            children: <Widget>[
              Column(
                children: <Widget>[
                  Container(
                  //  padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
                    height: MediaQuery.of(context).size.height * 0.8,
                    child: ListView.builder(
                      scrollDirection: Axis.vertical,
                      itemCount: initialGroups.length,
                      itemBuilder: (context, index) {
                        return Container(
                          width: MediaQuery.of(context).size.width * .7,
                          child: Card(
                            child: Column(children: [ListTile(
                              title: new Text(initialGroups[index].groupName),
                              subtitle: new Text("Members: " + initialGroups[index].members.toString()),
                              
                              leading: CircleAvatar(backgroundImage: ExactAssetImage('assets/images/logo.png'),
                minRadius: 5,
                maxRadius: 20,),
                            )
                              
                            ],)
                          )
                        );
                      }
                    ),
                  )
                ],
              )
            ],
          )
       
      
    );
  }
}