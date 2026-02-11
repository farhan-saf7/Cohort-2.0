const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController (req, res) {
    const { username, email, password, bio, profileImage } = req.body

    /* const isUserExistsByEmail = await userModel.findOne({email})
    if(isUserExistsByEmail){
        return res.status(409).json({
            message: "user already exists with this email"
        })
    }

    const isUserExistsByUsername = await userModel.findOne({username})
    if(isUserExistsByUsername){
        return res.status(409).json({
            message: "user already exists with this username"
        })
    } */

    const isUserExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserExists) {
        return res.status(409).json({
            message: "user already exists" + (isUserExists.email === email ? " Email already exists" : " Username already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign({
        user_id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registed sucessfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController (req, res) {
    const { username, email, password } = req.body
    const user = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email: email
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "password invalid"
        })
    }
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message: "user loggedIn sucessfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController, loginController
}