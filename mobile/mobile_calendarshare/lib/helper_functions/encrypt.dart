import 'package:crypto/crypto.dart';
import 'dart:convert';

String main(String username, String password) {
//  var username = 'bob';
//  var password = '123456';
  var string = username + password + username;
  print(string);

  var bytes = utf8.encode(string); // data being hashed
  var digest = sha256.convert(bytes).toString();

  print(digest);
  return digest;
}