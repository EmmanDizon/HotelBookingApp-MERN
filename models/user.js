const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.hashPassword = async function (password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const User = mongoose.model('users', userSchema);

module.exports = {
    User:User
}