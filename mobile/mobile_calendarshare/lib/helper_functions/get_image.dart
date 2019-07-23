import 'package:flutter/material.dart';

//void main() { runApp(GetImage());}




class ImagePicker {

static figureOutWhichImage(String type, int imageId) {
  switch (type) {
    case 'user':
      return userImages[imageId];
    case 'group':
      return groupImages[imageId];
    case 'event':
      return eventImages[imageId];
  }
}

}

var userImages = [
  'assets/defaultImages/userProfilePics/',
  'assets/defaultImages/userProfilePics/1.png',
  'assets/defaultImages/userProfilePics/2.png',
  'assets/defaultImages/userProfilePics/3.png',
  'assets/defaultImages/userProfilePics/4.png',
  'assets/defaultImages/userProfilePics/5.png',
  'assets/defaultImages/userProfilePics/6.png',
  'assets/defaultImages/userProfilePics/7.png',
  'assets/defaultImages/userProfilePics/8.png',
  'assets/defaultImages/userProfilePics/9.png',
  'assets/defaultImages/userProfilePics/10.png',
  'assets/defaultImages/userProfilePics/11.png',
  'assets/defaultImages/userProfilePics/12.png',
  'assets/defaultImages/userProfilePics/13.png',
  'assets/defaultImages/userProfilePics/14.png',
  'assets/defaultImages/userProfilePics/15.png',
];

var groupImages = [
  'assets/defaultImages/groupProfilePics/',
  'assets/defaultImages/groupProfilePics/1.jpg',
  'assets/defaultImages/groupProfilePics/2.jpg',
  'assets/defaultImages/groupProfilePics/3.jpg',
  'assets/defaultImages/groupProfilePics/4.jpg',
];

var eventImages = [
  'assets/defaultImages/eventPics/1.jpg',
  'assets/defaultImages/eventPics/2.jpg',
  'assets/defaultImages/eventPics/3.jpg',
  'assets/defaultImages/eventPics/4.jpg',
  'assets/defaultImages/eventPics/5.jpg',
  'assets/defaultImages/eventPics/6.jpg',
  'assets/defaultImages/eventPics/7.jpg',
  'assets/defaultImages/eventPics/8.jpg',
  'assets/defaultImages/eventPics/9.jpg',
  'assets/defaultImages/eventPics/10.jpg',
  'assets/defaultImages/eventPics/11.jpg',
  'assets/defaultImages/eventPics/12.jpg',
];