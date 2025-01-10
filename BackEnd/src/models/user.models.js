const mongoose = require('mongoose');
const userScehma = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true

    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default:""
    },
},{timestamps:true});
module.exports = mongoose.model('User',userScehma);