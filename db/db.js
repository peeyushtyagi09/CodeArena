const mongoose = require("mongoose");
const env = require('./../example_env');

const connectDB = async() => {
    try{
        await mongoose.connect(env.MONGODB_URL);
        console.log("✅ Successfully connected to mongodb ✅");
    }catch(err) {
        console.error("⚠️ Their is a error in { db.js } file in connection of mongodb ⚠️");
    }
}

module.exports = { connectDB };