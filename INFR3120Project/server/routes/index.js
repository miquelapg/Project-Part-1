var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Database' });
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Database' });
});


module.exports = router;
