# YOP: Year Of Programmers
> 개발자 회고록 아카이브

![](./src/assets/img/share.png) </br>

연말이 되면 각종 블로그, SNS에 개발자들의 `1년 회고`가 많이 올라옵니다.</br>
그 곳엔 1년 동안의 농축된 생각이 담겨있어 놓치지 않고 챙겨보곤 했습니다.</br>

이들을 모아 볼 수 있는 장소가 있다면 어떨까요?</br>
처음 개발을 시작한 사람부터, 매너리즘에 빠진 주니어 개발자, 10년차 베테랑 개발자.</br>
어떤 사람이라도 생각을 공유하고 다른 이들의 1년을 볼 수 있습니다.</br>

지금 바로 올려보세요.
https://yop.cool/


## Technical Stack
Angular2, Firebase


## Installation

```shell
# 의존성 설치
$ npm install
$ bower install

# 데이터 분석
$ node data-mining.js
$ node language-chart-data.js
$ node word-cloud.js

# 앵귤러 빌드
$ ng serve
```
- `data-mining.js`: firebase를 이용해서 모든 Posts data의 body를 parsing하고 `results.txt`로 저장합니다.
단 firebase config 설정을 미리 하셔야합니다.
- `language-char-data`.js: Javascript의 `.match` method를 이용해서 Programming Language를 parsing하고 데이터를 추출합니다. colorScheme Object를 수정하면 각 언어의 색을 바꿀 수 있습니다. `results.txt`가 있어야만 제대로 작동하고 결과물로 `chart-data.json`을 만듭니다.
- `word-cloud.js`: Twitter에서 만든 한글 형태소 분석기를 Wrapping한 node-twitter-korean-text 라이브러리를 사용합니다. `results.txt`의 string을 불러와 wordCloud에서 원하는 형태의 Data로 만들어 `nouns.json` 파일로 만들어줍니다. 단, node-twitter-korean-text를 이용하려면 local에 java가 설치되어있어야 합니다.


## Contributing
[프로젝트 보드](https://github.com/9XDM/YOP/projects/)에서 이슈를 확인해주세요.


## License
[MIT license](https://opensource.org/licenses/MIT)
