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
module.exports.FindOneClient = async (req,res) =>{
    try {
        const { id } = req.body
    Client.findOne({_id : id}).then((response)=>{
        res.status(200).json(response)
    })
    } catch (e) {
        res.status(400).send({message: e.message})
    }
    
}
module.exports.EditarCliente = async (req,res) => {
    try {

        const { id, nome, usina, porcent } = req.body
        Client.findOne({ _id: id }).then( (response) => {
            response.nome = nome
            response.usina = usina
            response.porcentagem = porcent

            response.save().then(()=>{
                res.status(200).send({message: 'Atualizado com sucesso'})
            }).catch((e) => {
                throw new Error(e.message)
            })
        }).catch((e) => {
            res.status(400).send({message: 'Não foi possivel Atualizar'})
        })
    } catch (e) {
        res.status(400).send({message: 'Não foi possivel Atualizar'})
    }
}

