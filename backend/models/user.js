// import mongoose module
const mongoose = require("mongoose");

// import mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator');

// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    tel: { type: Number, unique: true },
    address: String,
    pwd: { type: String, unique: true },
    role: { type:String, required: true},
    specialty: String,
    cv: String,
    avatar: String,
    childNbr: Number, 
    status: String
});

userSchema.plugin(uniqueValidator);

// create Model Name "User"
const user = mongoose.model("User", userSchema);

// make match exportable
module.exports = user;