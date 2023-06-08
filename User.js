const mongoose = require('mongoose')

const Users = mongoose.model('User',{
    puntaje: {type: String,required:true},
    nombre:{type: String},
    posrango:{type: Number},
    materia: { type: String },
})
module.exports = Users