const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
};