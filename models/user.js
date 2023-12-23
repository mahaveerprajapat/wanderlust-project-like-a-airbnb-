const mongoose = require('mongoose');
// const {Schema} = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');
const { schema } = require('./review');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

