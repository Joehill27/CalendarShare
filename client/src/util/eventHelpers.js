
module.exports = {

    convertDateToFormat(dateString) {
        let dateObject = new Date(dateString);
        const weekday = [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ];
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let month = monthNames[dateObject.getMonth()];
        let date = dateObject.getDate();
        let day = weekday[dateObject.getDay()];
        let hours = dateObject.getHours() % 12;
        let minutes = dateObject.getMinutes();

        let dayOrNight = 'AM';

        if(dateObject.getHours() > 12)
            dayOrNight = 'PM';

        let formattedDateString =  month + ' ' + date + ', ' + hours + ':' + minutes + ' ' + dayOrNight;

        return formattedDateString;
    },

    //Sort events by start time
    sortByDateAscending(events) {
        let result = events.sort(function(a, b) {
            return new Date(b.start) - new Date(a.start);
        });
        
        return result;
    },

    sortByDateDescending(events) {
        let result = events.sort(function(a, b) {
            return new Date(a.start) - new Date(b.start);
        });
        return result;
    },

    filterEventsbyDate(startDate, endDate, events) {
        let result = events.filter(function(event){
            if( (new Date(event.start) >= new Date(startDate)) 
            &&  (new Date(event.start) <= new Date(endDate)) )
                return event;     
        });
        return result;
    },

    //Filter by event type
    sortByEventType(events, type) {
        let result = events.filter(function(event) {
            return event.eventType == type;
        });
        return result;
    },

    //Split the events into two different arrays, then return arrays in new object
    //Mark by past event and current event
    sortByPastAndFuture(events) {
        
        let now = Date.now();

        let pastEvents = [];
        let futureEvents = [];

        events.forEach(event => {
            if(new Date(event.start) > now) {
                futureEvents.push(event);
            } else {
                pastEvents.push(event);
            }
        });

        let allEvents = {
            pastEvents:pastEvents,
            futureEvents:futureEvents
        };

        return allEvents;
    }

    //Sort by location (Probably not)
}