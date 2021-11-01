const mongoose = require('mongoose')
const Schema = mongoose.Schema

const client = new Schema({
    nome: {
        type: String,
        require: true
    },
    usina: {
        type: Number,
        require: true
    },
    porcentagem: {
        type: Number,
        require: true
    }
    ,
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("clients", client)