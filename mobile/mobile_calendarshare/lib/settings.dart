import 'package:flutter/material.dart';
import './api_calls/user_api_calls.dart';

class SettingsPage extends StatefulWidget {
  SettingsPage({Key key,
    this.settings, this.userId
  }) : super(key: key);

  final Map<String, dynamic> settings;
  final String userId;

  @override
  _SettingsPageState createState() => new _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  TextEditingController bioController;
  TextEditingController cityController;
  TextEditingController countryController;

  void submitSettings(context) async {
    Map<String, dynamic> updateSettings = Map();
    updateSettings.putIfAbsent('bio', () =>bioController.text);
    updateSettings.putIfAbsent('city', () => cityController.text);
    updateSettings.putIfAbsent('country', () => countryController);

    String settings = '{ "bio":"'
        +bioController.text + '","city":"'+ cityController.text + '","country":"' + countryController.text+  '"}';


    UserApi.updateSettings(widget.userId, settings)
    .then((result) => print(result.toString()));

    Navigator.of(context).pop(updateSettings);
  }

  _initializeSettings() {
    Map<String, dynamic> settings = widget.settings;
    TextEditingController bioController = new TextEditingController();
    TextEditingController cityController = new TextEditingController();
    TextEditingController countryController = new TextEditingController();
    bioController.text = settings['bio'];
    cityController.text = settings['city'];
    countryController.text = settings['country'];
  }

  @override
  void initState() {
    super.initState();
    _initializeSettings();
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