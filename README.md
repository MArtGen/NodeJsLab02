# NodeJsLab02
NodeJsLab02 of Melekhau Artsiom
Лаба 2, вариант 5.

Файл lab02http:

Запуск: ts-node app.ts

GET-запросы:
1) 127.0.0.1:3000/api/buyer         - читает содержимое файла покупателя
2) 127.0.0.1:3000/api/shop          - читает содержимое файла магазина
3) 127.0.0.1:3000/api/newfile/buyer - создаёт новый файл покупателя с содержимым по-умолчанию
4) 127.0.0.1:3000/api/newfile/shop  - создаёт новый файл магазина с содержимым по-умолчанию

POST-запросы:
1) 127.0.0.1:2000/api/buyer - записывает данные в файл покупателя.

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
			"order_cost":1048
		}
	]
}

2) 127.0.0.1:2000/api/shop - записывает данные в файл магазина.

Пример:
[
	{
		"id":1,
		"buyer":
		{
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
	}
]

3) 127.0.0.1:2000/api/cancord - отменяет заказ.

Пример:
{
	"order_num": 1,
	"buyer_id": 1
}

PUT-запросы:
1) 127.0.0.1:2000/api - добавляет заказ.

Пример:
{
	"order_date":"Tue-May-21-2019",
	"order_cost":314
}

DELETE-запросы
1) 127.0.0.1:2000/api - удаляет файлы покупателя и магазина.

P.S. Express часть будет позже. Не успеваю катастрофически.