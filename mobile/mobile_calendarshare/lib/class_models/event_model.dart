
class Event {
  String id, name, type, description, startDate, endDate, imageId,
    formattedStart, formattedEnd;

  Map<String, dynamic> location;



 
  Event( this.name, this.type, this.description,);

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
        location = serializedEvent['location'];
       

  toJson() {
    return {
      "_id": id,
      "eventName": name,
      "eventType": type,
      "eventDetails": description,
      "start": startDate,
      "end": endDate,
      "eventPicture": imageId,
      "location": location
    };
  }

  //TODO
  getPicture() {

  }

}