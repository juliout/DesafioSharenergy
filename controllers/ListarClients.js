const mongoose = require('mongoose')
require('../models/user')
const Client = mongoose.model('clients')

module.exports.ClientList = async (req,res) => {
    try {
        await Client.find().then( c => {
            res.status(200).json(c)
        }).catch( e => {
            throw new Error ('Não foi possivel achar os Clients')
        })

    } catch (e) {
        res.send(400).json({message : e.message})
    }
}

module.exports.ClientFind = async (req, res) => {
    try {
        const { name } = req.body         
        
        await Client.find({ nome:  {$regex: name, $options: 'i'} }).exec().then( c => {
            res.status(200).json(c)
        }).catch( e =>{
            throw new Error('Não foi possivel achar esse Usuario')
        })

    } catch (e) {
        res.send(400).json({message : e.message})
    }
}