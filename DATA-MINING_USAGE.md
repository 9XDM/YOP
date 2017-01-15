# Usage

```
$ npm install
$ bower install
```
script Usage

```
$ node data-mining.js
$ node language-chart-data.js
$ node word-cloud.js
```

## data-mining.js

firebase를 이용해서 모든 Posts data의 body를 parsing하고 `results.txt`로 저장합니다.
단 firebase config 설정을 미리 하셔야합니다.

## language-char-data.js

Javascript의 `.match` method를 이용해서 Programming Language를 parsing하고 데이터를 추출합니다. colorScheme Object를 수정하면 각 언어의 색을 바꿀 수 있습니다.
`results.txt`가 있어야만 제대로 작동하고 결과물로 `chart-data.json`을 만듭니다.

## word-cloud.js

Twitter에서 만든 한글 형태소 분석기를 Wrapping한 node-twitter-korean-text 라이브러리를 사용합니다. `results.txt`의 string을 불러와 wordCloud에서 원하는 형태의 Data로 만들어 `nouns.json` 파일로 만들어줍니다.

단, node-twitter-korean-text를 이용하려면 local에 java가 설치되어있어야 합니다.
