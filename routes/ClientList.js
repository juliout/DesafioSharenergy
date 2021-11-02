const express = require('express');
const router = express.Router();
const { ClientList, ClientFind } = require('../controllers/ListarClients')
const { DeletarCliente, FindOneClient, EditarCliente } = require('../controllers/EditarCliets')

router.get('/', ClientList)
router.post('/find', ClientFind )
router.post('/findone', FindOneClient )
//rota de deletar Client
router.post('/deletarCliet', DeletarCliente )
// //rota par Update Client
router.post('/updateClient', EditarCliente)

module.exports = router;