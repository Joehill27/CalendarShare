import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'stacked_icons.dart';
import 'home.dart';


class Friend{
  String userName;

  Friend(this.userName);
}

 class FriendPage extends StatelessWidget {

 final initialFriends = <Friend>[]
 ..add(new Friend("Miguel"))
 ..add(new Friend("Sam"))
 ..add(new Friend("Joe"))
 ..add(new Friend("NoobMaster69"))
 ..add(new Friend("GodofThunder53"))
 ..add(new Friend("SuperSerium_Soldier"))
 ..add(new Friend("X-23"))
 ..add(new Friend("T.Stark_AKA_IronMAN"))
 ..add(new Friend("That guy"))
 ..add(new Friend("thats_what_she_said"))
 ..add(new Friend("User1_"))
 ..add(new Friend("Brendi"));

  @override
  Widget build(BuildContext context) {
    
    return new Scaffold(
      backgroundColor: Colors.blueGrey[900],
      appBar: new AppBar(
        centerTitle: true,
        backgroundColor:Colors.transparent,
          elevation: 0.0,
          iconTheme: new IconThemeData(color: Color(0xFF18D191)),
          title: Text("My Friends"),
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
                      itemCount: initialFriends.length,
                      itemBuilder: (context, index) {
                        return Container(
                          width: MediaQuery.of(context).size.width * .7,
                          child: Card(
                            child: Column(children: [ListTile(
                              title: new Text(initialFriends[index].userName),
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