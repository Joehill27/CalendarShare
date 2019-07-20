import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
//import 'package:mobile_calendarshare/user_registration.dart';
import 'stacked_icons.dart';
import 'home.dart';


class Friend{
  String userName;

  Friend(this.userName);
}

class FriendsPage extends StatefulWidget {
  FriendsPage({Key key, this.title}) : super(key: key);

  final String title;
  @override
  _FriendsPageState createState() => new _FriendsPageState();
}

class _FriendsPageState extends State<FriendsPage> {
final initialBuds = <Friend>[]
..add(new Friend('CoolGuy'))
..add(new Friend('RadGal'));

  @override
  Widget build(BuildContext context) {
    
SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark.copyWith(
  statusBarColor: Colors.blue, //or set color with: Color(0xFF0000FF)
));
    return new Scaffold(
      appBar: new AppBar(
        backgroundColor:Colors.transparent,
          elevation: 0.0,
          iconTheme: new IconThemeData(color: Color(0xFF18D191))),
      body: new ListView(
        children: <Widget>[
          Container(
            child: ListView.builder(
              scrollDirection: Axis.vertical,
              itemCount: initialBuds.length,
              itemBuilder: (context, index){
                return Container(
                  width: MediaQuery.of(context).size.width * .7,
                child: Card(
                  child: Column(children: [ListTile(
                    title: Text(initialBuds[index].userName),
                    
                    leading: Icon(Icons.people,
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
                
          },
            ),
      )
        ],
      )
    );
}
}