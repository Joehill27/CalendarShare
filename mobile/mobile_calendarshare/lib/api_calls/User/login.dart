import 'package:http/http.dart';

void main() {
  _loginRequest("admin");
}

_loginRequest(String username) async {
  String url = 'http://cop4331groupone.com/api/user/login';

  String password = "";

  Response response;
  Map<String, String> headers = {"Content-type": "application/json"};
  String request = '{"username":"' + username + '", "password":"' + password + '"}';
  print(request);
  try {
    response = await post(url, headers: headers, body: request);
  } catch(e) {
    print(e);
  }
  finally {
    if(response != null) {
      String json = response.body;
      print(json);
    }
  }
}