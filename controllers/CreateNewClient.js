const mongoose = require('mongoose')
require('../models/user')
const Client = mongoose.model('clients')

module.exports.newUser = async (req, res, next) =>{
    try {
        const {name , usina, porcentagem} = req.body

        if(!name || !usina || !porcentagem){
            throw new Error ('Não pode haver campos vazios')
        }
        if(name === '' || usina === '' || porcentagem === ''){
            throw new Error ('campos invalidos')
        }
        if(name.length > 50){
            throw new Error ('Nome muito Grande')
        }
        if(isNaN(porcentagem)){
            throw new Error ('Porcentagem Precisa ser em Numeros')
        }
        if(isNaN(usina)){
            throw new Error ('Usina Precisa ser em Numeros')
        }
        if(usina.length > 1){
            throw new Error ('usina pode ter apenas 1 digito')      
        }
           
        const clients = await Client.find().select({_id: 0, porcentagem}).then( e =>{
            return e
        })
        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        if(clients.reduce(reducer).porcentagem > 100){
            throw new Error('A porcentagem limite da usina é 100')
        }

        const user = ({
            nome: name,
            usina: usina,
            porcentagem: porcentagem
        })

        new Client(user).save().then(()=>{
            res.status(200).json({message: 'salvo'})
        }).catch(e => {
            res.status(400).json({message: e.message})
        })
        
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}