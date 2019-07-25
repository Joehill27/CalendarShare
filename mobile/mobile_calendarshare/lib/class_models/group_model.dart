
class Group {
  String id, groupName, groupPicture;

  List members, events;
  Map<String, dynamic> settings;

  Group.detailed(this.id, this.groupName, this.members, this.events,
      this.groupPicture, this.settings);

  Group.fromJson(Map<String, dynamic> json) :
        id = json['_id'],
        groupName = json['groupName'],
        members = json['members'],
        events = json['events'],
        groupPicture = json['groupPicture'],
        settings = json['settings'];

  toJSon(Group group) {
    return{
      "_id": id,
      "groupName": groupName,
      "members": members,
      "events": events,
      "groupPicture": groupPicture,
      "settings": settings
    };
  }

  //TODO
  getPicture() {

  }
}