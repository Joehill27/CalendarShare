import 'package:http/http.dart';

void main() {
  _createAccountRequest("mynameisbob", "bobsiemanym", "hilljoe272727@yahoo.com");
}

_createAccountRequest(String username, String password, String email) async {
  String url = 'http://cop4331groupone.com/api/user/createAccount';

  Response response;
  Map<String, String> headers = {"Content-type": "application/json"};
  String request = '{"username":"'+username+'","password":"'
      + password+'","email":"'+email+'"}';

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