var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');

router.get('/', function(req, res, next) {
  helper.readTodo('shop', res);
  res.end("Reading of shop.txt");
});

module.exports = router;
