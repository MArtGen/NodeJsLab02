var express = require('express');
var router = express.Router();
var helper = require('../../helper.ts');

router.get('/', function(req, res, next) {
  helper.readTodo('buyer', res);
  res.end("Reading of buyers's file");
});

module.exports = router;
