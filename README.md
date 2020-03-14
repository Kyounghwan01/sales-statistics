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