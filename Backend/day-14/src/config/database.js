const mongoose = require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connect to db")
}

module.exports = connectToDb