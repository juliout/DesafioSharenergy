const express = require('express');
const router = express.Router();
const { Login } = require('../controllers/LoginController')

router.post('/', Login)

module.exports = router;