'use strict';
const _ = require('lodash');
const fs = require('fs');

const text = fs.readFileSync('./results.txt', 'utf8');

const languageArray = [
  'Javascript','HTML', 'CSS', 'C++', 'C#', 'C', 'Python', 'Ruby' ,'GO', 'Haskell',
  'Java', 'Scala', 'Perl', 'Swift', 'Rust', 'Kotlin', 'LISP', 'PHP',
];

const languageSynonyms = {
  자바스크립트: 'javascript',
  ecmascript: 'javascript',
  c언어: 'c',
  파이썬: 'python',
  루비: 'ruby',
  자바: 'java',
  스칼라: 'scala',
  스위프트: 'swift',
  러스트: 'rust',
  코틀린: 'kotlin',
};

const languageObject = {};

_.forEach(languageArray, data => {
  languageObject[data] = 0;
})

const makeRegExpFromArray = (array) =>
  new RegExp(
    array.map((word) => {
      const result = _.toLower(word).replace(/\+/, '\\+');

      return /^(c|go)$/.test(result) ? `\\b${result}\\b` : result;
    }).join('|'),
    'g',
  );

const languageRegExp = makeRegExpFromArray([...languageArray, ...Object.keys(languageSynonyms)]);

const languages = _.toLower(text).match(languageRegExp);

const countObject = _.countBy(languages);

const colorScheme = {
    "Kotlin": "#4BC0C0",
    "Rust": "#4BC0C0",
    "Ruby": "#FF6384",
    "GO": "#41C5D3",
    "PHP": "#D0F1CF",
    "Java": "#379956",
    "Scala": "#FC5185",
    "Perl": "#0298c3",
    "HTML": "#3FC1C9",
    "Swift": "#364F6B",
    "C": "#D53939",
    "C#": "#FFB563",
    "CSS": "#F9DE79",
    "Javascript": "#FFCE56",
    "Python": "#5a96c4",
    "LISP": "#8BC34A",
    "Haskell": "#29b544",
    "C++": "#415F9D",
    "Etc": "#E7E9ED"
};

_.forEach(countObject, (_count, name) => {
  if (name === 'javascript' || name === '자바스크립트' || name === 'ecmascript') {
   languageObject["Javascript"] += countObject[name];
  } else if (name === 'html') {
   languageObject["HTML"] += countObject[name];
  } else if (name === 'css') {
   languageObject["CSS"] += countObject[name];
  } else if (name === 'c++') {
   languageObject["C++"] += countObject[name];
  } else if (name === 'c#') {
   languageObject["C#"] += countObject[name];
  } else if (name === 'c' || name === 'c언어') {
   languageObject["C"] += countObject[name];
  } else if (name === 'python' || name === '파이썬') {
   languageObject["Python"] += countObject[name];
  } else if (name === 'ruby' || name === '루비') {
   languageObject["Ruby"] += countObject[name];
  } else if (name === 'go') {
   languageObject["GO"] += countObject[name];
  } else if (name === 'haskell' || name === '하스켈') {
   languageObject["Haskell"] += countObject[name];
  } else if (name === 'java' || name === '자바') {
   languageObject["Java"] += countObject[name];
  } else if (name === 'scala' || name === '스칼라') {
   languageObject["Scala"] += countObject[name];
  } else if (name === 'perl') {
   languageObject["Perl"] += countObject[name];
  } else if (name === 'swift' || name === '스위프트') {
   languageObject["Swift"] += countObject[name];
  } else if (name === 'rust' || name === '러스트') {
   languageObject["Rust"] += countObject[name];
  } else if (name === 'kotlin' || name === '코틀린') {
   languageObject["Kotlin"] += countObject[name];
  } else if (name === 'lisp') {
   languageObject["LISP"] += countObject[name];
  } else if (name === 'php') {
   languageObject["PHP"] += countObject[name];
  }
})

function sortObject(obj) {
  'use strict';
  const arr = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        'key': prop,
        'value': obj[prop]
      });
    }
  }
  arr.sort((a, b) => (b.value - a.value));
  return arr;
}

let sortedPickLanguage = _.values(_.pickBy(sortObject(languageObject), o => (o.value != 0)));

if (sortedPickLanguage.length > 7) {
  let etc = {
    key: 'Etc',
    value: 0
  }
  let removeCount = 0;
  _.forEach(sortedPickLanguage, (language, index) => {
    if (index > 6) {
      etc.value += language.value;
      removeCount++;
    }
  })
  sortedPickLanguage.splice(7, removeCount);
  sortedPickLanguage.push(etc);
}

const data = [];
_.forEach(sortedPickLanguage, (object) => {
  data.push(object.value);
})

const backgroundColor = [];
const sortedLanguageNames = [];
_.forEach(sortedPickLanguage, (object) => {
  sortedLanguageNames.push(object.key)
  backgroundColor.push(colorScheme[object.key]);
})
const hoverBackgroundColor = backgroundColor;

const chartData = {
    labels: sortedLanguageNames,
    datasets: [
      {
        data,
        backgroundColor,
        hoverBackgroundColor
      }
    ]
}

const dir = __dirname + '/src/data';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

fs.writeFile(`${dir}/chart-data.json`, JSON.stringify(chartData), function(err) {
  if(err) throw err;
  console.log('File write completed');
});
