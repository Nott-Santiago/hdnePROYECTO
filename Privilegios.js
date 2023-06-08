const mongoose = require('mongoose');

const Privilegios = mongoose.model('Privilegios',{
    nombrepriv: {type: String},
    rolpriv: {type: String},
    
});

module.exports = Privilegios;