# account-project

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### aws lambda + api gateway 백엔드 api docs
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

TODO

- ~~기입 - orderCreate - validate 작성할것 ~~
- 현황창 디자인 & ui 구성 - 필터: 날짜, 기간, 이름, 최신/과거순
- ~~매출등록할때 회사명 등록 필요 -> 회사 변경시 매출 등록된 회사 이름 모두 바꿈 필요~~ -> 회사 이름 변경시 - 해당 주문목록의 회사이름 동시변경 **완**
- 전체 주문, 고객별 주문 페이지네이션 api **완**

```js
//countDocuments pagenation을 위한 total 값
Order.countDocuments({ userId: proxy }).exec((count_error, count) => {
  if (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(err),
      headers: corsHeader
    });
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ order, count }),
    headers: corsHeader
  });
});
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
- 회원가입시 회사명 적고, 로그인시 회원가입한 회사명으로 가진 회사, 매출,매입만 뜨도록 (유저별 커스텀) **완**
- user api 변경 필요 **완**
- 회원가입시 사용 회사명 INPUT필요, 새로운 데이터 컬럼 필요(company) **완**
- 불필요 api 제거 - queryString으로 api 2개 (전체 주문, 회사별 주문)로 축소 **완**

**FRONT**
- 로그인, 회원가입 페이지 공용 컴포넌트로 재구성
- 로그인 - 비밀번호 , 이메일 틀리면 모달
- 현황창에서 주문 선택후 - 주문 수정, 주문 삭제 - `fill/주문id` **완**
- 회원창에서 - 주문 현황 보는 ui - 필터: 최신/과거, 기간, 매출/매입 별 **완**
- 회원창에서 주문 수정 - `users/고객id?orderId=주문id`에서 수정 **완**
- 현황분석 디자인 - 기간별 매출, 매입 **완**
  - 매입, 매출 바그래프 **완**
  - 기간 필터(월/주), 원형 그래프, 꺾은선 그래프 - 매출 % 출력 **완**
- 엑셀다운로드 : 현황 (기간별 매출/매입 리스트 다운), 통계 - 기간별 매출/매입 리스트 다운, 전체 엑셀다운로드 - 모든 기간 다운로드 (매출/)
현황리스트 (필터대로 엑셀다운로드), 고객리스트, 매출 매입 전체 엑셀다운로드
- 미수금 핸들링 어떻게 할건지?

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
