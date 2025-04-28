const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
    },
    data:{
        type:Date,
        default:Date.now()
    },
});

const User = mongoose.model('User',UserSchema);

module.exports = User;