import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/group_page.dart';
import 'package:search_widget/search_widget.dart';
import './class_models/group_model.dart';

class ListViewSearch extends StatefulWidget {
  final Group group;

  ListViewSearch(this.group);

  _ListViewSearchState createState() => _ListViewSearchState();
}

class _ListViewSearchState extends State<ListViewSearch> {
  TextEditingController _textController = TextEditingController();

  final List<String> _listViewData = [
    "Inducesmile.com",
    "Flutter Dev",
    "Android Dev",
    "iOS Dev!",
    "React Native Dev!",
    "React Dev!",
    "express Dev!",
    "Laravel Dev!",
    "Angular Dev!",
  ];

  List<String> _newData = [];

  _onChanged(String value) {
    setState(() {
      _newData = _listViewData
          .where((string) => string.toLowerCase().contains(value.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey[900],
      appBar: AppBar(
        backgroundColor: Colors.blueGrey[600],
        centerTitle: true,
        title: Text("Request"),
      ),
      body: Column(
        children: <Widget>[
          SizedBox(height: 15.0),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _textController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'enter text here',
                hintStyle: TextStyle(color: Colors.white),
              ),
              onChanged: _onChanged,
            ),
          ),
          SizedBox(height: 20.0),
          _newData != null && _newData.length != 0
              ? Expanded(
                  child: ListView(
                    padding: EdgeInsets.all(10.0),
                    children: _newData.map((data) {
                      return ListTile(title: Text(data, style: TextStyle(color: Colors.white),));
                    }).toList(),
                  ),
                )
              : SizedBox(),
        ],
      ),
    );
  }
}