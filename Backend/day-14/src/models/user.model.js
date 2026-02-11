const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true,"username should be unique"],
        require: [true,"username is required"]
    },
    email:{
        type: String,
        unique: [true,"username should be unique"],
        require: [true,"username is required"]
    },
    password:{
        type: String,
        require: [true,"username is required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default: "https://ik.imagekit.io/9uuaejipm/default-avatar.jpg"
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel