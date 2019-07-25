import 'package:flutter/material.dart';
import 'login.dart';

void main() => runApp(CalendarShare());

class CalendarShare extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Calendar Share',
      debugShowCheckedModeBanner: false,
      // Set Raleway as the default app font
      theme: ThemeData(
        fontFamily: 'Roboto',
      ),

      home: MyHomePage(),
      
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.blueGrey[900],
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            CircleAvatar( 
          backgroundImage: AssetImage('assets/images/calendarlogo.png'),
          minRadius: 20,
          maxRadius: 100,
         ),

         SizedBox(
           height: 20,
         ),
            new Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(top: 8.0, bottom: 80.0),
                  child: new Text(
                    "Calendar Share",
                    style: new TextStyle(fontSize: 30.0, color: Colors.white),
                  ),
                )
              ],
            ),
            new Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(
                        left: 20.0, right: 20.0, top: 10.0),
                    child: GestureDetector(
                       onTap: () {
                         Navigator.push(context, MaterialPageRoute(
                           builder: (context) => LoginPage(),
                         ));
                      },
                      child: new Container(
                          alignment: Alignment.center,
                          height: 60.0,
                          decoration: new BoxDecoration(
                              color: Color(0xFF18D191),
                              borderRadius: new BorderRadius.circular(9.0)),
                          child: new Text("Sign In With Email",
                              style: new TextStyle(
                                  fontSize: 20.0, color: Colors.white))),
                    ),
                  ),
                )
              ],
            ),
            
          ],
        ),
      ),
    );
  }
}