const mongoose = require('mongoose')
require('../models/user')
const Client = mongoose.model('clients')

module.exports.DeletarCliente = async (req,res)=>{
    try {
        const {id} = req.body
        if(!id){
            res.status(400).send({message: 'não foi possivel deletar'})
        }
        Client.deleteOne({_id: id}).then(()=>{
            res.status(200).send({message: 'Deletado com Sucesso'})
        }).catch( e =>{
            res.status(400).send({message: 'não foi possivel deletar'})
        })
    } catch (e) {
        res.status(400).send({message: 'não foi possivel deletar'})
    }

}