const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({

    name: requiredString,
    
    company: requiredString,

    email: requiredString,

    hash: requiredString,

    roles: requiredString

});

schema.methods.generateHash = function(pass) {
    this.hash = bcrypt.hashSync(pass, 4);
};


module.exports = mongoose.model('Reviewer', schema);