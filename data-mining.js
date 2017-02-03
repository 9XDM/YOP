'use strict';
const firebase = require('firebase');
const _ = require('lodash');
const fs = require('fs');

const config = {
  apiKey: "AIzaSyDRWInNTqMZMkbbFxeJfbjHN3dwSZLJbKI",
  authDomain: "yopyop-5e569.firebaseapp.com",
  databaseURL: "https://yopyop-5e569.firebaseio.com",
  storageBucket: "yopyop-5e569.appspot.com",
  messagingSenderId: "798678080282"
};

firebase.initializeApp(config);

const ref = firebase.database().ref('/posts/');

ref.once('value').then(snapshot => {
  let bodyArray = [];
  _.forEach(snapshot.val(), data => {
    bodyArray.push(data.body);
  });
  bodyArray = _.join(bodyArray, ' ');
  return fs.writeFile('./results.txt', bodyArray, function(err) {
    if(err) throw err;
    console.log('DataMining File write completed');
    process.exit()
  });
})
