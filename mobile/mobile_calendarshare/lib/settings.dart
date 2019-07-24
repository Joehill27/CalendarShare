import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {
  SettingsPage({Key key,
    this.settings
  }) : super(key: key);

  final Map<String, dynamic> settings;

  @override
  _SettingsPageState createState() => new _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  TextEditingController bioController = new TextEditingController();
  TextEditingController cityController = new TextEditingController();
  TextEditingController countryController = new TextEditingController();

  void submitSettings(context) {
    Map<String, dynamic> updateSettings = Map();
    updateSettings.putIfAbsent('bio', () =>bioController.text);
    updateSettings.putIfAbsent('city', () => cityController.text);
    updateSettings.putIfAbsent('country', () => countryController);

    Navigator.of(context).pop(updateSettings);
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Settings'),
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
                    controller: bioController,
                    decoration: new InputDecoration(
                      labelText: 'Tell us a little about yourself.',
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: cityController,
                    decoration: new InputDecoration(
                      labelText: "What city are you from?",
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: countryController,
                    decoration: new InputDecoration(
                      labelText: 'What country are you from?',
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.all(16.0),
                child: new Builder(
                  builder: (context) {
                    return new RaisedButton(
                      color: Colors.indigoAccent,
                      child: new Text('Update Settings'),
                      onPressed: () => submitSettings(context),
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