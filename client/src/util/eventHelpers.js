
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

    sortAndFilter(sortBy, filterBy, events) {
        let result = events;
        if(filterBy !== '') {
            result = this.filterByEventType(events, filterBy);
        }
        result = (sortBy === 'Asc') ?
            this.sortByDateAscending(result) : this.sortByDateDescending(result);
    },

    //Sort events by start time
    sortByDateAscending(events) {
        console.log('Ascending');
        console.log('Starting with unsorted: ' + JSON.stringify(events));
    
    var swapp;
    var n = events.length-1;
    var result = events;
    do {
        swapp = false;
        for (var i = 0; i < n; i++) {
            console.log(result[i].start);
            console.log(result[i+1].start);
            if (new Date(result[i].start) > new Date(result[i + 1].start)) {
                var temp = result[i];
                result[i] = result[i+1];
                result[i+1] = temp;
                swapp = true;
            }
        }
        n--;
    } while (swapp);
        console.log('Ending with: ' + JSON.stringify(result));
        return result;
    },

    sortByDateDescending(events) {
        console.log('descending');
        console.log('Starting with: ' + JSON.stringify(events));
        var swapp;
        var n = events.length-1;
        var result = events;
        do {
            swapp = false;
            for (var i = 0; i < n; i++) {
                console.log(result[i].start);
                console.log(result[i+1].start);
                if (new Date(result[i].start) < new Date(result[i + 1].start)) {
                    console.log('Swapping!');
                    var temp = result[i];
                    result[i] = result[i+1];
                    result[i+1] = temp;
                    swapp = true;
                }
            }
            n--;
        } while (swapp);

        console.log('Ending with: ' + JSON.stringify(result));
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
    filterByEventType(events, type) {
        let result = events.filter(function(event) {
            return event.eventType === type;
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