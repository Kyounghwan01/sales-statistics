# sales-statistics

## [배포주소](https://sales-statistics.netlify.com/)

## Intorduction

- **sales-statistics** 매출, 매입을 손쉽게 등록하고 기간별로 통계내어 현황 관찰을 쉽게 보기도록 이용하는 웹입니다.
- 엑셀로 일일히 관리하시기 어려우신 개인사업자분의 요청을 기반으로 만들어졌으며 데이터베이스 초기화를 염려하시는 분이 많아 엑셀 다운로드 기능을 따로 만들었습니다.
- 프로젝트 기간 : 2020. 3 ~ 2020. 5

## Content

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Skills](#Skills)
- [Deployment & Continuous Integration](#Deployment-&-Continuous-Integration)
- [api](#api)
- [Challenges](#Challenges)
- [Things To Do](#Things-To-Do)

## Requirements

- 웹 사용을 권장합니다.
- 추후 웹앱으로 개발할 예정으로 웹앱 개발 완료시 앱 사용도 가능하게 됩니다. 이 프로젝트를 반응형으로 css개발 후, react-native기반으로 webview로 웹을 감쌀 예정입니다.

## Installation

```javascript
git clone https://github.com/Kyounghwan01/sales-statistics.git
yarn install

yarn start
```

Features

- 계정
  - 회원가입
  - 로그인
  - 로그아웃
- 매출/매입할 회사 정보 CRUD
- 회사 이름/전화번호로 찾기
- 각 회사별 매출/매입 CRUD
- 매출/매입 현황 필터링 (기간별, 회사별, 매출/매입별, 최신/과거순)
- 통계
  - 선택 월/주 기준 이전 5개월/5주 통계
  - 선택 기간 매출/매입 현황을 막대/꺾은선 그래프로 트렌드 체크
  - 선택 월/주 기준 매출/매입을 회사 및 물품별 파이 그래프로 현황 체크
- 엑셀 다운로드
  - 매출/매입 현황 필터링 된 목록 엑셀 다운로드
  - 매출/매입 현황 전체 엑셀 다운로드

## Skills

### Client-Side

- ES2015+
- Vue
- Vuex
- Vue Router
- vue-property-decorator
- TypeScript
- Scss
- vue-chartjs
- element-ui
- firebase auth
- vuelidate

### Server-Side

- AWS Lambda
- AWS api gateway
- Node.js
- Express
- ES2015+
- MongoDB
- Mongoose
- Atlas

## Deployment & Continuous Integration

### Client

- Netlify CI를 통한 배포 자동화

### Server

- AWS Lambda 이용으로 코드 바로 배포

### AWS lambda + api gateway 백엔드 api docs

## api
## 로그인 유저 api

### GET

1. 전체 로그인 유저 조회

```
GET: https://BASEURL/2020-03-07/user

[
  {
    "_id": "5e88b344eb56c200073b1e82",
    "name": "nk",
    "email": "noh23@gmail.com",
  },
  {
    "_id": "5e88b6888f11570007ab5f21",
    "name": "nk",
    "email": "noh23@gmail.com",
  },
]

```

2. 특정 로그인 유저 조회

```
GET: https://BASEURL/2020-03-07/user/유저 _id
{
  "_id": "5e88b344eb56c200073b1e82",
  "name": "nk",
  "email": "noh23@gmail.com",
}

```

### POST

1. 회원가입시 유저 정보 등록

```
POST: https://BASEURL/2020-03-07/user

body:
{
  "name":"ksh",
  "email": "1s23noh23@gmail.com"
}
```

## 회사 api

### GET

1. 전체 회사 목록 조회

```
GET:  https://BASEURL/2020-03-07/board
res: [{회사정보}, {회사정보} ... ]
```

2. 로그인한 유저에 등록된 회사 목록 조회

```
GET:  https://BASEURL/2020-03-07/board/:companyUid
res: [{회사정보}, {회사정보} ... ]
```

### POST

1. 회사 생성

```
POST: https://BASEURL/2020-03-07/board

body: {
  "name" : "hihi",
  "content": "hihihihihihi",
  "phone": "01022349891",
  "address": "경기 하남",
  "registreDate": "2020-03-07"
}
```

### PUT

1. 회사 정보 수정

```
PUT: https://BASEURL/2020-03-07/:id

body: {
  "name" : "hihi",
  "content": "hihihihihihi",
  "password": "123",
  "phone": "01022349891",
  "address": "경기 하남",
  "registreDate": "2020-03-07"
}

```

### DELETE

1. 회사 삭제

```
DELETE: https://BASEURL/2020-03-07/:id

```

## 주문 api

### GET

1. 주문 조회

- companyUid: 로그인한 유저 id (string)
- page, limit: pagenation 값 (number)
- start_date, end_date: 기간 조회 값 (string)
- userId: 회사별 조회 값 (array)
- past: 값 있으면 과거순, 없으면 최신순

```
GET: https://BASEURL/2020-03-07/order?page=0&limit=100&companyUid=gVkEsl6w21TgXgIRD10XwPoUy9o1&start_date=20200407&end_date=20200409&type=true&userId=['3', '4']

res: {
  "order": [
   {주문정보}, {주문정보}, ...
  ],
  "count": 2
}
```

### POST

1. 주문 생성

- 주문 생성할 고객 id를 파람으로 넘긴다.

```
POST: https://BASEURL/2020-03-07/order/4

body:
{
  "companyUid": "gVkEsl6w21TgXgIRD10XwPoUy9o1"
  "userName": "2"
  "type": true,
  "date": 20200322,
  "price": 123123,
  "memo": "메모",
  "goods": "상품명",
  "unitPrice": 10,
  "count": 10,
  "outstanding": 1000
}

res: '주문정보 추가 완료'
```

### PUT

1. 주문 수정

- 주문 수정할 주문 id를 파람으로 넘긴다.

```
PUT: https://BASEURL/2020-03-07/order/5e7213ab99d73b00096ff8ae

body:
{
  "companyUid": "gVkEsl6w21TgXgIRD10XwPoUy9o1"
  userName: "2"
  "type": false,
  "date": 50190322,
  "price": 123123,
  "memo": "dawdawdawdawdqweqwe테스트으됬니??",
  "goods": "dddddd",
  "unitPrice": 10,
  "count": 10,
  "outstanding": 100
}

res: "success"
```

### DELETE

1. 주문 삭제

- 주문 삭제할 주문 id를 파람으로 넘긴다.

```
DELETE: https://BASEURL/2020-03-07/order/5e7207ef4bdb80000715689d
res: "success"
```

TODO
**BACK**

- api - board - user 이름 또는 폰번으로 id 찾기 - (정확한 이름으로 검색시 id 리턴 후, id로 order찾기) - **완**
- api - 기간별, 고객별, 전채, 과거, 최신순 정렬 **완**
- api - 매출/매입별 소팅 **완**
- api - order - 수정/삭제 **완**
- 전체 주문, 고객별 주문 페이지네이션 api **완**
- 회원가입시 회사명 적고, 로그인시 회원가입한 회사명으로 가진 회사, 매출,매입만 뜨도록 (유저별 커스텀) **완**
- user api 변경 필요 **완**
- 회사 수정시 order database에 등록된 회사 이름 value 모두 바꿈 -> 회사 이름 변경시 - 해당 주문목록의 회사이름 동시변경 **완**
- 회원가입시 사용 회사명 INPUT필요, 새로운 데이터 컬럼 필요(company) **완**
- 불필요 api 제거 - queryString으로 api 2개 (전체 주문, 회사별 주문)로 축소 **완**

**FRONT**

- 로그인, 회원가입 페이지 공용 컴포넌트로 재구성
- 로그인 - 비밀번호 , 이메일 틀리면 모달
- 기입 - orderCreate - validate 작성할것 **완**
- 현황창에서 주문 선택후 - 주문 수정, 주문 삭제 - `fill/주문id` **완**
- 회원창에서 - 주문 현황 보는 ui - 필터: 최신/과거, 기간, 매출/매입 별 **완**
- 회원창에서 주문 수정 - `users/고객id?orderId=주문id`에서 수정 **완**
- 현황분석 디자인 - 기간별 매출, 매입 **완**
  - 매입, 매출 바그래프 **완**
  - 기간 필터(월/주), 원형 그래프, 꺾은선 그래프 - 매출 % 출력 **완**
- 엑셀다운로드 : 현황 (기간별 매출/매입 리스트 다운) **완** (추후 엑셀 다운로드에 대한 요구 있을 시 로직 수정)
- 현황, 회사 리스트 - 페이지네이션 **완**

## Challenges

- AWS Lambda, api gateway 기본 사용법 숙지
  - lambda 함수 내에서 mongodb, mongoose를 설치하는 과정에서 시간 소요
  - lambda내 계층 탭에 mongoose node_module를 직접 다운받아 넣어서 사용함
- 통계
  - 5개월치를 한번에 ajax호출시 서버 과부하로 정상적인 실행이 안됨
  - 기간내 30일이 넘지 않도록 하고, 30일이 넘으면 api를 한번더 호출하는 방법으로 기간을 쪼개 여러번 호출
  - promise all로 빠르게 response를 받도록 기능 구현
- element ui
  - 매번 css를 구현하다가 처음으로 부트스트랩을 사용했는데, 사용법만 익히면 빠르게 코딩이 가능한 장점이 있음
  - docs를 제대로 익히면 web에서 많이 쓰이는 기능은 단기간내 구현가능
- ts 프로젝트 구조 설정
  - 가장 시간이 많이 걸린 부분은 맨처음 프로젝트 세팅이였다.
  - 프로젝트 세팅에 너무 힘을 많이 쏟아 가장 기본적인 `main.js`, `api` 부분만 ts로 구현하고 나머지는 js로 구현하였다. -> 모든 파일 ts화 완료
  - 구현시 ts로 인해 module not found 에러에 대해서 전역으로 `types/vue-global.d.ts`이라는 파일을 만들어 ts를 사용하는 모듈/파일을 declare함
- 여러 번 사용하는 로직/컴포넌트 분리
  - 많이 사용하는 함수(숫자 3자리 이상 comma찍기 등)는 `utils`파일로 빼서 전역으로 모든 파일에서 호출 사용 가능하도록 만듬
  - priceInput, numberInput, textInput, tabs등 여러 곳에서 사용하는 컴포넌트 분리하여 사용

## Things To Do

- 모바일 웹뷰 만들기
  - react-native 웹뷰 테스트 완료
  - 해당 프로젝트 반응형으로 만들어 webView 라이브러리안에 넣으면 바로 react-native에서 실행 가능하다
- client test 만들기 (unit test 완료, component test 미완료)
  - 기능 구현에 중점을 두어 test파일을 만들지 못함
- 모든 js 파일 ts화 **완**
  - ts로 프로젝트 구조를 짜다가 기본 개념 부족으로 인해 ts + js로 프로젝트 방향을 바꿈
  - ts를 더 공부하여 이 프로젝트를 모두 ts로 바꿀 것
- cors 에러 문제
  - 간헐적으로 cors에러가 발생함. AWS Lambda내에서 모든 cors를 열어 놓은 상태인데 간헐적으로 나오는 이 문제를 해결하지 못함. 새로고침시 cors 에러가 뜨지 않음. 원인 파악 불가

### js와 ts 두 언어로 모두 프로젝트를 진행하며 느낀점

- 만약 유지보수하는 경우, 기존에 있는 프로젝트에 기능을 더 넣는 경우 개발을 더 빠르게 할 수 있었다.
  - 변수의 타입을 미리 알 수 있으니 변수를 추적하는 시간이 줄어들어 그만큼 좋은 로직을 더 생각할 수 있었고, 개발 속도도 빨라졌다.
  - 그러나 새롭게 프로젝트를 만드는 경우, 새로운 페이지를 만드는 경우는 js가 더 빠른 속도로 개발할 수 있었다.
- ts를 통해 unit test 코딩을 동시에 하는 좋은 기회가 됬다.
- class 컴포넌트를 처음 써보고 코딩을 진행하였는데, 기존 오브젝트 기반 컴포넌트에서 ts도입시 에러를 뿜던 props 타입 문제가 깔끔하게 해결됬고, get, set으로 computed정의하는 형태가 깔끔하게 읽히기 좋았으며 데코레이터 형식으로 watch, prop, emit을 정의하기 때문에 좀더 눈에 잘 읽혔다. 전반적으로 기존있던 프로젝트를 처음오는 사람에게 읽기 쉬운 코드가 된것 같다.
- ts를 연구하면서 코딩하느라 미흡한 점이 많고, 타입정의 중복부분이 매우 많다 ts interface 모듈화하는 과정을 공부하여 다시 리펙토링 하면 좋을 것 같다.
