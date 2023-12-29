var express = require('express');
var router = express.Router();
const {envioController}=require('../controller/envio.Controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/envio', envioController)
module.exports = router;
