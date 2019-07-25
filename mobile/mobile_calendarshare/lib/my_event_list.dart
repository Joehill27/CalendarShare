import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/event_card.dart';
import 'package:mobile_calendarshare/class_models/event_model.dart';

class MyEventList extends StatelessWidget {
  final List<Event> events;
  final String userId;

  MyEventList(this.userId, this.events);

  ListView _buildList(context) {
    return new ListView.builder(
      itemCount: events.length,
      itemBuilder: (context, int) {
        return new EventCard(userId, events[int]);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildList(context);
  }
  }