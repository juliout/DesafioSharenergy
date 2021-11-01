const express = require('express');
const router = express.Router();
const { newUser } = require('../controllers/CreateNewClient')

router.post('/', newUser)

module.exports = router;