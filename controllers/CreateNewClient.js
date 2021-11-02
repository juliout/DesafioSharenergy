const mongoose = require('mongoose')
require('../models/user')
const Client = mongoose.model('clients')

module.exports.newUser = async (req, res, next) =>{
    try {
       
        const {name, usina, percentual} = req.body

        if(name === '' || usina === '' || percentual === ''){
            throw new Error ('campos invalidos')
        }
        if(name.length > 50){
            throw new Error ('Nome muito Grande')
        }
        if(isNaN(usina)){
            throw new Error ('Usina Precisa ser em Numeros')
        }
        if(isNaN(percentual)){
            throw new Error ('porcentagem Precisa ser em Numeros')
        }
        
        if(percentual > 100){
            throw new Error ('numero max é 100')
        }    
        if(usina.length > 1){
            throw new Error ('usina pode ter apenas 1 digito')      
        }
        
        Client.find().select('porcentagem').then( clients =>{            
            let total = clients.reduce( (acc, c)=> acc + c.porcentagem, 0)              
            const somaTotal = total + percentual            
            if(somaTotal > 100){
                throw new Error('percentual maior que 100%')
            }   
        }).then(()=>{

            const user = ({
                nome: name,
                usina: usina,
                porcentagem: percentual
            })

            new Client(user).save().then(()=>{
                res.status(200).send({message: 'salvo'})
            }).catch(e => {
                res.status(400).send({message: e.message})
            })

        }).catch( e => {          
            return res.status(400).send({message: e.message})
        })        
    } catch (e) {
        res.status(400).send({message: e.message})
    }
}