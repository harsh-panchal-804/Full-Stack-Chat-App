const mongoose = require('mongoose');
const { image } = require('../lib/cloudinary');
const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps:true});
module.exports = mongoose.model('Message',messageSchema);