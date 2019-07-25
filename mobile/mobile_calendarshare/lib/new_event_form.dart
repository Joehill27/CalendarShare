import 'package:flutter/material.dart';
import 'package:mobile_calendarshare/class_models/event_model.dart';
import 'package:date_range_picker/date_range_picker.dart' as DateRagePicker;

class AddEventFormPage extends StatefulWidget {
  @override
  _AddEventFormPageState createState() => new _AddEventFormPageState();
}

class _AddEventFormPageState extends State<AddEventFormPage> {
  TextEditingController nameController = new TextEditingController();
  TextEditingController typeController = new TextEditingController();
  TextEditingController descriptionController = new TextEditingController();

  void submitEvent(context) {
    if (nameController.text.isEmpty) {
      Scaffold.of(context).showSnackBar(
            new SnackBar(
              backgroundColor: Colors.redAccent,
              content: new Text('Fields are Empty!', textAlign: TextAlign.center,)
            ),
          );
    } else {
    //  var newEvent = new Event(nameController.text, typeController.text,
    //      descriptionController.text);
    //  Navigator.of(context).pop(newEvent);
      
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.white,
      appBar: new AppBar(
        
        centerTitle: true,
        title: new Text('Add a new Event', style: TextStyle(color: Colors.white),),
        backgroundColor: Colors.indigo[200],
      ),
      body: new Container(
        color: Colors.transparent,
        child: new Padding(
          padding: const EdgeInsets.symmetric(
            vertical: 8.0,
            horizontal: 32.0,
          ),
          child: new Column(
            children: [
              SizedBox(
                height: 20,
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                  keyboardType: TextInputType.text,
                    controller: nameController,
                    decoration: new InputDecoration(
                      labelText: 'What are you doing?',
                      border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(4)))
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    keyboardType: TextInputType.text,
                    controller: typeController,
                    decoration: new InputDecoration(
                      labelText: "Where's it Happening?",
                      border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(4)))
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                  keyboardType: TextInputType.text,
                    controller: descriptionController,
                    decoration: new InputDecoration(
                      labelText: 'Tell us a little about it',
                      border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(4)))
                    )),
              ),

              SizedBox(
                height: 20,
              ),
              Row(children: <Widget>[
                new MaterialButton(
                  color: Colors.greenAccent[400],
                  onPressed: () async {
                    final List<DateTime> picked = await DateRagePicker.showDatePicker(
                      context: context,
                      initialFirstDate: new DateTime.now(),
                      initialLastDate: (new DateTime.now()).add(new Duration(days: 2)),
                      firstDate: new DateTime(2015),
                      lastDate: new DateTime(2020)
                      );
                  if (picked != null && picked.length == 2) {
                    print(picked);
                  }
                },
                child: new Text("Pick Date Range")
              ),
              ],),

              SizedBox(
                height: 40,
              ),
              new Padding(
                padding: const EdgeInsets.all(16.0),
                child: new Builder(
                  builder: (context) {
                    return new RaisedButton(
                      color: Colors.blue[300],
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
