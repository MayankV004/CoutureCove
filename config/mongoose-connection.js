require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(`${config.get("MONGODB_URI")}/CoutureCove`);
        dbgr('MongoDB connected');
    }catch(error){
        dbgr(error);
        process.exit(1);
    }
};

module.exports = connectDB;
