# sales-statistics

## Intorduction

- **sales-statistics** 매출, 매입을 손쉽게 등록하고 기간별로 통계내어 현황 관찰을 쉽게 보기도록 이용하는 웹입니다.
- 엑셀로 일일히 관리하시기 어려우신 개인사업자분의 요청을 기반으로 만들어졌으며 데이터베이스 초기화를 염려하시는 분이 많아 엑셀 다운로드 기능을 따로 만들었습니다.

## Content

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Features](#Features)
- [Skills](#Skills)
- [Test](#Test)
- [Deployment & Continuous Integration](#Deployment-&-Continuous-Integration)
- [Project Control](#Project-Control)
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

- JSON Web Token Authentication
- 회원가입
- 로그아웃
- 사용자 주문 내역 페이지
- 카페 메뉴 및 배치도 가져와서 자리 설정 및 메뉴 선정 기능
- 결재 후 본인 자리 확인 및 잔여시간 확인 기능
- 잔여시간 30분 이전, 잔여시간 2시간 추가 기능
- 잔여시간 초과시 자동 자리 초기화

### admin
- 카페 내부 배치도 수정 기능
- 카페 메뉴 수정 기능
- 주문 내역 확인 및 주문 처리 완료 기능

## Skills
### Client-Side

- ES2015+
- Vue
- Vuex
- Vue Router
- Scss

---- 여기부터 

### Server-Side
- AWS Lambda
- AWS api gateway
- Node.js
- Express
- ES2015+
- MongoDB
- Mongoose
- Atlas

### AWS lambda + api gateway 백엔드 api docs
- 고객 생성 POST - (/board) -
  body: {
  "name" : "hihi",
  "content": "hihihihihihi",
  "password": "123",
  "phone": "01022349891",
  "address": "경기 하남",
  "registreDate": "2020-03-07"
  }
- 고객 수정 PUT - (/board/:id) -
  body: {
  "name" : "hihi",
  "content": "hihihihihihi",
  "password": "123",
  "phone": "01022349891",
  "address": "경기 하남",
  "registreDate": "2020-03-07"
  }
- 고객 삭제 DELETE - (/board:id)
- 고객 조회 GET - (/board)
- 고객 상세 조회 GET - (/board/:id)
- 고객 주문 생성 POST - (/board/:id?order_history_id="주문번호") -
  body: {
  "type": false,
  "date": "2025-03-02",
  "price": 3000,
  "memo": "new memo??",
  "goods": "new 상품",
  "unitPrice": 100,
  "count": 30,
  "outstanding": 30000000000
  }
- 고객 주문 수정 PUT - (/board/:id?order_history_id="주문번호") -
  body: {
  "type": false,
  "date": "2025-03-02",
  "price": 3000,
  "memo": "new memo??",
  "goods": "new 상품",
  "unitPrice": 100,
  "count": 30,
  "outstanding": 30000000000
  }
- 고객 주문 삭제 DELETE - (/board/:id?order_history_id="주문번호")

---

## 주문 관련 api 수정

### GET

1. 전체 주문 조회

```
GET: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order
페이지네이션 작업 필요
```

2. 고객별 주문 조회

- page는 0부터 시작, total이 전체 count 값, 38번 고객의 주문 조회

```
GET: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order/38?page=0&limit=4

```

3. 기간별 주문 조회

- 2020.01.23 일부터 2020.03.20일 까지

```
GET: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order?start_date=20200123&end_date=20200320

```

4. 고객별 기간별 주문 조회

```
GET: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order/38?start_date=20200123&end_date=20200320
```

### POST

1. 주문 생성

- 주문 생성할 고객 id를 파람으로 넘긴다.

```
POST: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order/38

body:
{
	"type": true,
	"date": 20200322,
	"price": 123123,
	"memo": "dawdawdawdawdqweqwe테스트으됬니??",
	"goods": "상품명",
	"unitPrice": 10,
	"count": 10,
	"outstanding": -1
}
```

### PUT

1. 주문 수정

- 주문 수정할 주문 id를 파람으로 넘긴다.

```
PUT: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order/5e7213ab99d73b00096ff8ae

body:
{
	"type": false,
	"date": 50190322,
	"price": 123123,
	"memo": "dawdawdawdawdqweqwe테스트으됬니??",
	"goods": "dddddd",
	"unitPrice": 10,
	"count": 10,
	"outstanding": -1
}
```

### DELETE

1. 주문 삭제

- 주문 삭제힐 주문 id를 파람으로 넘긴다.

```
DELETE: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order/5e7207ef4bdb80000715689d
```

## 로그인 유저 api

### GET
1. 전체 로그인 유저 조회
```
GET: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/user

[
    {
        "_id": "5e88b344eb56c200073b1e82",
        "name": "nk",
        "email": "noh23@gmail.com",
        "__v": 0
    },
    {
        "_id": "5e88b6888f11570007ab5f21",
        "name": "nk",
        "email": "noh23@gmail.com",
        "__v": 0
    },
]

```
2. 특정 로그인 유저 조회
```
GET: https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/user/유저 _id
{
    "_id": "5e88b344eb56c200073b1e82",
    "name": "nk",
    "email": "noh23@gmail.com",
    "__v": 0
}


```
3. 회원가입시 유저 정보 등록
```
https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/user

body:
{
	"name":"ksh",
	"email": "1s23noh23@gmail.com"
}
```

- api - 과거순
```js
//최산순
Order.sort({date: -1})
//과거순
Order.sort({date: 1})
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
- 현황, 회사 리스트 - 페이지네이션

0410
### 주문 api
- 전체 주문 get
```
BASEURL/order?page=0&limit=100&past=1&companyUid=gVkEsl6w21TgXgIRD10XwPoUy9o1&start_date=20200407&end_date=20200409&type=true

companyUid : 회사 uid
page, limit: 페이지 네이션 파람
past: 값있으면 과거순 없으면 최신순
start_date, end_date: 기간 파람
type: 값 있으면 매입, 없으면 매출
```
- 특정 회사 주문 get
```
BASEURL/order/3?page=0&limit=100&start_date=20200407&end_date=20200409&type=true&past=1

pathParameters = 주문 id
page, limit: 페이지 네이션 파람
past: 값있으면 과거순 없으면 최신순
start_date, end_date: 기간 파람
type: 값 있으면 매입, 없으면 매출
```
