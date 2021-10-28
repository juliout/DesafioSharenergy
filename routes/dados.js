var express = require('express');
var router = express.Router();
const {dadosUsina} = require('../controllers/ControllerUsina')

/* GET users listing. */
router.get('/', dadosUsina);

module.exports = router;
