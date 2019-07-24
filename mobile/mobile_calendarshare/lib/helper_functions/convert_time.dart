
const months = ['', 'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

void main() {
  var string = '2019-07-25T16:00:00';

  var test = TimeFunctions.convertToEventFormat(string);
  print(test);
}

  class TimeFunctions{

  static convertToEventFormat(String dateFromDataBase){
    dateFromDataBase += 'Z';
    var date =  DateTime.parse(dateFromDataBase);
    String month = months[date.month];
    String day = date.day.toString();
    var hours = date.hour;
    String hoursString = hours.toString();
    if(hours < 10)
      hoursString = '0' + hours.toString();
    var minutes = date.minute;
    String minutesString = minutes.toString();
    if(minutes < 10)
      minutesString = '0' + minutes.toString();
    String dayOrNight = 'AM';
    if(hours > 12) {
      dayOrNight = 'PM';
      hours = hours % 12;
    }

    String formattedDateString = month + ' ' + day + ', ' + hoursString+
        ':' + minutesString + dayOrNight;

    return formattedDateString;

  }

}

