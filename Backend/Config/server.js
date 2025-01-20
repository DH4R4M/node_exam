const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed", error);
    }
};

module.exports = connectDB;