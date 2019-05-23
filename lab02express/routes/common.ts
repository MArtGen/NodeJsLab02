var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');
var bodyParser = require("body-parser");

router.post('/newbuyer', function(req, res, next) {
    helper.createTodo(JSON.stringify(req.body), res);
    res.end("Post is Done. Check the console.log");
});

router.post('/cancord', function(req, res, next) {
    helper.cancelOrder(JSON.stringify(req.body));
    res.end("Post is Done. Check the console.log");
});

router.put('/neworders', function(req, res, next) {
    helper.updTodo(JSON.stringify(req.body));
    res.end('Put a new order. Please check the console.log');
});

router.delete('/', function(req, res, next) {
    helper.deleteTodo(res);
});

module.exports = router;