const mongoose = require('mongoose')
require('../models/usuario')
const Usuario = mongoose.model('usuarios')

module.exports.Login = async( req, res ) =>{
    
    try {
        const { email, senha } = req.body

        Usuario.findOne({email: email, senha: senha }).then((response)=>{
            if(!response){
                throw new Error('usuario não existe')
            }
            if(response){
                res.status(200).send({
                    id: response._id,
                    email: response.email                    
                })
            }
        }).catch(e=>{
            return res.status(400).send({message: 'não foi possivel achar o usuario'})
        })
    } catch (e) {
        return res.status(400).send({message: 'usuario não existe'})
    }
}