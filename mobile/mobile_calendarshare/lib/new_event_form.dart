import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/class_models/event_model.dart';


class AddEventFormPage extends StatefulWidget {
  @override
  _AddEventFormPageState createState() => new _AddEventFormPageState();
}

class _AddEventFormPageState extends State<AddEventFormPage> {
  TextEditingController nameController = new TextEditingController();
  TextEditingController locationController = new TextEditingController();
  TextEditingController descriptionController = new TextEditingController();
  

  void submitEvent(context) {
    if (nameController.text.isEmpty) {
      Scaffold.of(context).showSnackBar(
            new SnackBar(
              backgroundColor: Colors.redAccent,
              content: new Text('New Event'),
            ),
          );
    } else {
      var newEvent = new Event(nameController.text, locationController.text,
          descriptionController.text,);
      Navigator.of(context).pop(newEvent);
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Add a new Event'),
        backgroundColor: Colors.black87,
      ),
      body: new Container(
        color: Colors.black54,
        child: new Padding(
          padding: const EdgeInsets.symmetric(
            vertical: 8.0,
            horizontal: 32.0,
          ),
          child: new Column(
            children: [
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: nameController,
                    decoration: new InputDecoration(
                      labelText: 'What are you doing?',
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: locationController,
                    decoration: new InputDecoration(
                      labelText: "Where's it Happening?",
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: descriptionController,
                    decoration: new InputDecoration(
                      labelText: 'Tell us a little about it',
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.all(16.0),
                child: new Builder(
                  builder: (context) {
                    return new RaisedButton(
                      color: Colors.indigoAccent,
                      child: new Text('Create Event'),
                      onPressed: () => submitEvent(context),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
