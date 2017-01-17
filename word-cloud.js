'use strict';
const TwitterKoreanProcessor = require('node-twitter-korean-text');
const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./results.txt', 'utf8');
const LIMIT_WORDS_NUMBER = 50;

// 인간지능 TF-IDF .....
let isAllowKey = (word) => {
  const excludeWords = ['것', '알', '위', '감', '앞', '내', '날', '데', '로', '약', '쪽', '줄', '입', '중', '약', '곳', '해', '치', '파', '더', '게', '전', '반', '니', '뿐', '늘', '함', '거나', '온', '로서', '도', '의', '분', '땐', '해도', '대해', '로써'];
  return !_.includes(excludeWords, word);
}

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
        if (isAllowKey(key)) {
          cloudData.push({"text": key, "weight": value});
        }
      })

      const sliceData = cloudData.slice(0, LIMIT_WORDS_NUMBER);

      return fs.writeFile('./nouns.json', JSON.stringify(sliceData), (err) => {
        if(err) throw err;
        console.log('Nouns File write completed');
      })
    })
  });
});
