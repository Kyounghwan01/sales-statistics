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
ㅈ
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
- 현황창 디자인 & ui 구성 - 필터: 날짜, 기간, 이름
- ~~매출등록할때 회사명 등록 필요 -> 회사 변경시 매출 등록된 회사 이름 모두 바꿈 필요~~ -> 회사 이름 변경시 - 해당 주문목록의 회사이름 동시변경
- api - 과거순
- api - board - user 이름 또는 폰번으로 id 찾기
- 로그인, 회원가입 페이지 공용 컴포넌트로 재구성
- 현황창에서 주문 선택후 - 주문 수정, 주문 삭제 - `fill/주문id`
- 회원창에서 - 주문 현황 보는 ui
- 회원창에서 주문 수정 - `users/고객id?orderId=주문id`에서 수정
- 현황분석 디자인

