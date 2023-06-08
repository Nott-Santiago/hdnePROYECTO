const mongoose = require('mongoose')

const Roles = mongoose.model('Rol',{
    nombreRol: {type: String}
})

module.exports = Roles