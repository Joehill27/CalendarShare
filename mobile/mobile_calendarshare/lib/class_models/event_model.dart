import 'dart:convert';

class Event {
  String id, name, type, description, startDate, endDate, imageId,
    formattedStart, formattedEnd, location;
 
  Event(this.type, this.location, this.name);

  Event.detailed(this.id ,this.name, this.type, this.description, this.startDate,
      this.endDate, this.imageId, this.location);

  Event.fromJson(Map<String, dynamic> serializedEvent) :
        id = serializedEvent['_id'],
        name = serializedEvent['eventName'],
        type = serializedEvent['eventType'],
        description = serializedEvent['eventDetails'],
        startDate = serializedEvent['start'],
        endDate = serializedEvent['end'],
        imageId = serializedEvent['eventPicture'],
        location = serializedEvent['eventLocation'];
       

  toJson() {
    return {
      "_id": id,
      "eventName": name,
      "eventType": type,
      "eventDetails": description,
      "start": startDate,
      "end": endDate,
      "eventPicture": imageId,
      "eventLocation": location
    };
  }

  //TODO
  getPicture() {

  }

}