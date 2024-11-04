const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlenght:[3,"Username should contain atleast 3 letters"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlenght:[7,"Email should contain atleast 7 characters"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlenght:[5,"Password should contain atleast 5 characters"]
    }
});

const user = mongoose.model("user",userSchema);

module.exports = user;

