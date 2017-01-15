'use strict';
const firebase = require('firebase');
const _ = require('lodash');
const fs = require('fs');

const config = {
  apiKey: "HI",
  authDomain: "HI",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
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
    console.log('File write completed');
  });
})
