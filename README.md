# NodeJsLab02
NodeJsLab02 of Melekhau Artsiom
Лаба 2, вариант 5.

Запуск: 
1) ts-node app.ts         <- lab02http
2) ts-node www.ts         <- lab02express

Запросы для lab02http и lab02express одинаковые:

GET-запросы:
1) 127.0.0.1:3000/api/buyer         - читает содержимое файла покупателя
2) 127.0.0.1:3000/api/shop          - читает содержимое файла магазина

POST-запросы:
1) 127.0.0.1:3000/api/newbuyer - записывает данные в файл покупателя.

Пример:
{
	"id":1,
	"orders":[
		{
			"order_date":"Tue-May-21-2019",
			"order_cost":148
		},
		{
			"order_date":"Tue-May-21-2019",
			"order_cost":259
		},
		{
			"order_date":"Tue-May-21-2019",
			"order_cost":218	
		}
	]
}

2)

3) 127.0.0.1:3000/api/cancord - отменяет заказ.

Пример:
{
	"order_num": 1,
	"buyer_id": 1
}

PUT-запросы:
1) 127.0.0.1:3000/api/neworders - добавляет заказ.

Пример:
{
	"order_date":"Tue-May-21-2019",
	"order_cost":314
}

DELETE-запросы
1) 127.0.0.1:3000/api/ - удаляет файлы покупателя и чистит файл магазина.
