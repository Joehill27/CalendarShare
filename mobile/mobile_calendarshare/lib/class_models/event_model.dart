import 'dart:convert';

class Event {
  String id, name, type, description, startDate, endDate, imageId,
    formattedStart, formattedEnd, location;

  Event(this.type, this.location, this.name);

  Event.detailed(this.id ,this.name, this.type, this.description, this.startDate,
      this.endDate, this.imageId);

  fromJson(String json) {
    Map<String, dynamic> serializedEvent = jsonDecode(json);
    return new Event.detailed(serializedEvent['_id'],
        serializedEvent['eventName'], serializedEvent['eventType'],
        serializedEvent['eventDetails'],serializedEvent['start'],
        serializedEvent['end'],  serializedEvent['eventPicture']
    );
  }

  toJson() {
    return {
      "_id": id,
      "eventName": name,
      "eventType": type,
      "eventDetails": description,
      "start": startDate,
      "end": endDate,
      "eventPicture": imageId
    };
  }

}