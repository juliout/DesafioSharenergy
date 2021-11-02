const express = require('express');
const router = express.Router();
const { ClientList, ClientFind } = require('../controllers/ListarClients')
const { DeletarCliente } = require('../controllers/EditarCliets')

router.get('/', ClientList)
router.post('/find', ClientFind )
//rota de deletar Client
router.post('/deletarCliet', DeletarCliente )
// //rota par Update Client
// router.post('/updateClient', '')

module.exports = router;