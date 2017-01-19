'use strict';
const _ = require('lodash');
const fs = require('fs');

const text = fs.readFileSync('./results.txt', 'utf8');

const languageArray = ['Javascript', 'HTML', 'CSS', 'C++', 'C#', 'C', 'Python', 'Ruby' ,'GO', 'Haskell', 'Java', 'Scala', 'Perl', 'Swift', 'Rust', 'Kotlin', 'LISP', 'PHP'];

const languageObject = {};

_.forEach(languageArray, data => {
  languageObject[data] = 0;
})

const laguageRegex = /javascript|자바스크립트|ecmascript|html|css|(c\+\+)|(c\#)|c|python|파이썬|ruby|루비|go|haskell|하스켈|java|자바|scala|스칼라|perl|swift|스위프트|rust|러스트|Kotlin|코틀린|lisp|php/g; 

const languages = _.toLower(text).match(laguageRegex);

const countObject = _.countBy(languages);

const colorScheme = {
    "Kotlin": "#F18E33",  
    "Rust": "#dea584",
    "Ruby": "#701516",  
    "GO": "#375eab", 
    "PHP": "#4F5D95",  
    "Java": "#b07219",  
    "Scala": "#DC322F",
    "Perl": "#0298c3",  
    "HTML": "#e44b23",  
    "Swift": "#ffac45", 
    "C": "#555555",  
    "C#": "#178600", 
    "CSS": "#563d7c", 
    "Javascript": "#f1e05a",  
    "Python": "#3572A5", 
    "LISP": "#3fb68b", 
    "Haskell": "#29b544", 
    "C++": "#f34b7d",
    "Etc": "#57585B"
};

_.forEach(countObject, (count, name) => {
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
  } else if (name === 'c') {
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
  } else if (name === 'Swift' || name === '스위프트') {
   languageObject["swift"] += countObject[name];
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

fs.writeFile('./chart-data.json', JSON.stringify(chartData), function(err) {
  if(err) throw err;
  console.log('File write completed');
});

