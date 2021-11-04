const mongoose = require('mongoose')
require('../models/usuario')
const Usuario = mongoose.model('usuarios')


module.exports.register = async ( req,res ) => {
    try {
        const {usuario, senha} = req.body

        new Usuario({
            email: usuario,
            senha : senha
        }).save().then(()=>{
           return res.status(200).send('sucesso')
        }).catch((e)=>{
            res.status(400).send({message: 'erro ao cadastrar'})
        })
    } catch (e) {
        res.status(400).send({message: 'erro ao cadastrar'})
    }
}