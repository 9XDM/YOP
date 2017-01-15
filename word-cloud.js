'use strict';
const TwitterKoreanProcessor = require('node-twitter-korean-text');
const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./results.txt', 'utf8');

TwitterKoreanProcessor.normalize(text).then(result => {
  TwitterKoreanProcessor.tokenize(result).then((token) => {
    TwitterKoreanProcessor.tokensToJsonArray(token, true).then(results => {
      let nouns = [];
      for(let i=0; i < results.length; i++) {
        const temp = results[i];
        if (temp["koreanPos"] === 'Noun') {
          nouns.push(temp["text"]);
        }
      }
      const nounsCount = _.countBy(nouns);
      const cloudData = [];
      _.forEach(nounsCount, (value, key) => {
        cloudData.push({"text": key, "weight": value})
      })
      return fs.writeFile('./nouns.json', JSON.stringify(cloudData), (err) => {
        if(err) throw err;
        console.log('Nouns File write completed');
      })
    })
  });
});
