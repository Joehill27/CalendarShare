
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