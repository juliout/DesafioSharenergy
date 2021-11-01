const express = require('express');
const router = express.Router();
const { ClientList, ClientFind } = require('../controllers/ListarClients')

router.get('/', ClientList)
router.post('/find', ClientFind )

module.exports = router;