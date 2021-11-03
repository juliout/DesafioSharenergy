const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuario = new Schema({
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("usuarios", usuario)