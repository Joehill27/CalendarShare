import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile_calendarshare/event_card.dart';
import 'package:mobile_calendarshare/event_detail_page.dart';
import 'package:mobile_calendarshare/event_model.dart';
import 'package:mobile_calendarshare/past_events.dart';
import 'package:mobile_calendarshare/new_event_form.dart';


import 'my_event_list.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title}) : super(key: key);

  final String title;
  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _bottomNavIndex=0;

  @override
  Widget build(BuildContext context) {
    var key = new GlobalKey<ScaffoldState>();
    return new Scaffold(
      key:  key,
      bottomNavigationBar: new BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        fixedColor: Color(0XFF29D091),
         currentIndex: _bottomNavIndex,
         onTap: (int index){
          setState((){
            _bottomNavIndex = index;
            
          });
         },
         
        items: [
          new BottomNavigationBarItem(
            title: new Text(''),
             icon: new Icon(Icons.home)
          ),
          new BottomNavigationBarItem(
            title: new Text(''),
             icon: new Icon(Icons.group)
          ),
          new BottomNavigationBarItem(
            title: new Text(''),
             icon: new Icon(Icons.message)
          ),
          new BottomNavigationBarItem(
            title: new Text(''),
             icon: new Icon(Icons.search)
          )

        ],
      ),
      appBar: new AppBar(
          backgroundColor: Colors.teal,
          elevation: 0.0,
          title: new Text('Welcome, User'),
          iconTheme: new IconThemeData(color: Color(0xFF18D191))),
      body: MainContent(),
    );
  }
}

class MainContent extends StatelessWidget {
 
final initialEvents = <Event>[]
  ..add(new Event('Concert', 'Amway Center', 'Biggest Hits of 2019'))
  ..add(new Event('Family Reunion', 'Magic Kingdom', 'Smiths 11th Annual Disney Get-Together'))
  ..add(new Event('Concert', 'Amway Center', 'Biggest s of 2019'))
  ..add(new Event('Pool Party', 'Glen\'s Place', 'Summer\'s Hottest Event'));

final initialGroupEvents = <Event>[]
  ..add(new Event('Musical', 'Amway Center', 'Biggest Hits of 2019'))
  ..add(new Event('Disney Day', 'Magic Kingdom', 'Smiths 11th Annual Disney Get-Together'))
  ..add(new Event('Magics Game', 'Amway Center', 'Biggest hits of 2019'))
  ..add(new Event('Study PARTY', 'Glen\'s Place', 'Summer\'s Hottest Event'));

final initialPastEvents = <Event> [];


  @override
  Widget build(BuildContext context) {
    return new ListView(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15.0),
          child: new Container(
              child: new Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  new Text(
                    "Explore Whats Going On",
                    style: new TextStyle(
                      fontSize: 20.0,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ],
              ),
              new SizedBox(
                height: 10.0,
              ),
              Row(
                children: <Widget>[
                  new Expanded(
                      child: Padding(
                    padding: const EdgeInsets.only(right: 5.0),
                    child: new Container(
                      height: 100.0,
                      decoration: new BoxDecoration(
                          borderRadius: new BorderRadius.circular(8.0),
                          color: Color(0xFFFD7384)),
                      child: new Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          new Icon(
                            Icons.music_note,
                            color: Colors.white,
                          ),
                          new Text("Music",
                              style: new TextStyle(color: Colors.white))
                        ],
                      ),
                    ),
                  )),
                  new Expanded(
                      child: new Container(
                    height: 100.0,
                    child: Column(
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding:
                                const EdgeInsets.only(bottom: 2.5, right: 2.5),
                            child: new Container(
                              decoration: new BoxDecoration(
                                  color: Color(0XFF2BD093),
                                  borderRadius: new BorderRadius.circular(8.0)),
                              child: new Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.only(right: 8.0),
                                    child: new Icon(
                                      Icons.local_dining,
                                      color: Colors.white,
                                    ),
                                  ),
                                  new Text('Dining\nExperiences',
                                      style: new TextStyle(color: Colors.white, fontSize: 10.0))
                                ],
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding:
                                const EdgeInsets.only(top: 2.5, right: 2.5),
                            child: new Container(
                              decoration: new BoxDecoration(
                                  color: Color(0XFFFC7B4D),
                                  borderRadius: new BorderRadius.circular(8.0)),
                              child: new Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.only(right: 8.0),
                                    child: new Icon(
                                      Icons.stars,
                                      color: Colors.white,
                                    ),
                                  ),
                                  new Text('Sports',
                                      style: new TextStyle(color: Colors.white, fontSize: 14.0))
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  )),
                  new Expanded(
                      child: new Container(
                    height: 100.0,
                    child: Column(
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding:
                                const EdgeInsets.only(left: 2.5, bottom: 2.5),
                            child: new Container(
                              decoration: new BoxDecoration(
                                  color: Color(0XFF53CEDB),
                                  borderRadius: new BorderRadius.circular(8.0)),
                              child: new Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.only(right: 8.0),
                                    child: new Icon(
                                      Icons.local_movies,
                                      color: Colors.white,
                                    ),
                                  ),
                                  new Text('Shows',
                                      style: new TextStyle(color: Colors.white))
                                ],
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(left: 2.5, top: 2.5),
                            child: new Container(
                              decoration: new BoxDecoration(
                                  color: Color(0XFFF1B069),
                                  borderRadius: new BorderRadius.circular(8.0)),
                              child: new Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.only(right: 8.0),
                                    child: new Icon(
                                      Icons.event_available,
                                      color: Colors.white,
                                    ),
                                  ),
                                  new Text('Other',
                                      style: new TextStyle(color: Colors.white))
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  )),
                ],
              ),
              new SizedBox(
                height: 30.0,
              ),
        
             
            
  
              
              
              

            new SizedBox(
                height: 15.0,
              ),
              new Container(
              alignment: Alignment.centerLeft,
              child: new Text("My Events", style: new TextStyle(
                fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.indigo,)
              
              )),
              
              Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.35,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: initialEvents.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .6,
                child: Card(
                  
                  color: Colors.yellow,     
                             
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => EventDetailPage(initialEvents[index]),
                        ));
                      },
                      
                      child: new Text(initialEvents[index].name + '\n'+ initialEvents[index].description),
                     
                )
                ));
              
        }),
      ),    
                            
             
                 
                 
                    
              new SizedBox(
                height: 15.0,
              ),
              new Container(
              alignment: Alignment.centerLeft,
              child: new Text("Group Events", style: new TextStyle(
                fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.indigo,)
            
              )),
              Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.35,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: initialGroupEvents.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .6,
                child: Card(
                  
                  color: Colors.transparent,     
                             
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => EventDetailPage(initialGroupEvents[index]),
                        ));
                      },
                      child: new Text(initialGroupEvents[index].name), 
                )
                ));
              
        }),
      ),
    
  
              
             
              new SizedBox(
                height: 15.0,
              ),
              new Container(
              alignment: Alignment.centerLeft,
              child: new Text("Past Events", style: new TextStyle(
                fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.indigo,)
            
              )),
              Container(
        padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 20.0),
        height: MediaQuery.of(context).size.height * 0.35,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
            itemCount: initialPastEvents.length, itemBuilder: (context, index) {
              return Container(
                width: MediaQuery.of(context).size.width * .6,
                child: Card(
                  
                  color: Colors.white,     
                             
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(
                          builder: (context) => EventDetailPage(initialPastEvents[index]),
                        ));
                      },
                      child: new Text(initialEvents[index].name), 
                )
                ));
              
        }),
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
    );
  }
  
}