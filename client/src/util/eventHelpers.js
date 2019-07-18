
module.exports = {

    //Sort events by start time
    sortByDateAscending(events) {
        return events;
    },

    sortByDateDescending(events) {
        return events;
    },

    //Filter by event type
    sortByEventType(events, type) {
        return events;
    },

    //Split the events into two different arrays, then return arrays in new object
    //Mark by past event and current event
    sortByPastAndFuture(events) {
        let allEvents = [];
        let pastEvents = [];
        let futureEvents = [];

        return allEvents;
    }

    //Sort by location (Probably not)

}