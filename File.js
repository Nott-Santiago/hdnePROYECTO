const mongoose = require('mongoose');

const Files = mongoose.model('File',{
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true }
})

module.exports = Files