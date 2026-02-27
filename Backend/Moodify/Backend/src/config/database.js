const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db")
    })
    .catch(err =>{
        console.log("Error connecting to DB", err)
    })
}

module.exports = connectToDb