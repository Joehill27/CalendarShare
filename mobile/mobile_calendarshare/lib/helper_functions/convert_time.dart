
const months = ['', 'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

void main() {
  var string = '2020-11-17T13:24:00';

  var test = TimeFunctions.convertToEventFormat(string);
  print(test);
}

  class TimeFunctions{

  static convertToEventFormat(String dateFromDataBase){
    var date =  DateTime.parse(dateFromDataBase);
    var month = months[date.month];
    String day = date.day.toString();
    var hours = date.hour;
    var minutes = date.minute;
    var dayOrNight = 'AM';
    if(hours > 12) {
      dayOrNight = 'PM';
      hours = hours % 12;
    }

    var formattedDateString = month + ' ' + day + ', ' + hours.toString() +
        ':' + minutes.toString() + dayOrNight;

    return formattedDateString;

  }

}

