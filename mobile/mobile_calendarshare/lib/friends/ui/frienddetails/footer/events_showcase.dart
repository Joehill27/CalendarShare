import 'package:flutter/material.dart';

class EventsShowcase extends StatelessWidget {
  List<Widget> _buildItems() {
    var items = <Widget>[];
      var image = new Image.asset(
        'assets/images/study_session.png',
        width: 200.0,
        height: 200.0,
      );
      items.add(image);
      image = new Image.asset(
        'assets/images/party.png',
        width:200.0,
        height: 200.0
      );
      items.add(image);
      image = new Image.asset(
        'assets/images/basketball_tournament.png',
        width:200.0,
        height: 200.0
      );
      items.add(image);
      image = new Image.asset(
        'assets/images/concert.png',
        width:200.0,
        height: 200.0
      );
    items.add(image);

    return items;
  }

  @override
  Widget build(BuildContext context) {
    var delegate = new SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,
      crossAxisSpacing: 8.0,
      mainAxisSpacing: 8.0,
    );

    return new ListView(
      padding: const EdgeInsets.only(top: 16.0),
      scrollDirection: Axis.horizontal,
      //gridDelegate: delegate,
      children: _buildItems(),
    );
  }
}
