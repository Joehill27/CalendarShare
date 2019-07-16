import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/event_detail_page.dart';
import 'package:mobile_calendarshare/event_model.dart';
import 'package:mobile_calendarshare/my_event_list.dart';

class EventCard extends StatefulWidget {
  final Event event;

  EventCard(this.event);

  @override 
  EventCardState createState(){
    return new EventCardState(event);}
  
}

class EventCardState extends State<EventCard> {
  Event event;

  EventCardState(this.event);

void initState() {
    super.initState();
  }

  get eventCard {
    new Expanded(
      child: new Container(
        width: 25.0,
        height: 25.0,
        child: new Card(
          color: Colors.black,
          child: new Padding(
            padding: const EdgeInsets.only(
              top:8.0,
              bottom: 8.0,
              left: 75.0,
            ),
            child: new Column(
              
              children: <Widget>[
               
                new Text(event.name.toString(),
                    style: Theme.of(context).textTheme.headline),
                new Text(widget.event.location,
                    style: Theme.of(context).textTheme.subhead),
                
              ],
            ),
          ),
        ),
      ),
      );
    
  }

  @override
  Widget build(BuildContext context) {
    return new InkWell(
      onTap: () => showEventDetailPage(),
      child: new Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10),
        child: new Container(
          height: 20.0,
        
        ),
      ),
    );
  }

  showEventDetailPage() {
    Navigator.of(context).push(new MaterialPageRoute(builder: (context) {
      return new EventDetailPage(event);
    }));
  }
}