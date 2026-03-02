const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function registerUserController(req, res) {
    const { username, email, password } = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(400).json({
            messgae: "user already registered"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)

    return res.status(201).json({
        messgae: "user registered sucessfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUserController(req, res) {
    const { email, password, username } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)

    return res.status(200).json({
        message: "user logged in sucessfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)
    if (!user) {
        res.status(404).json({
            message: "user not found"
        })
    }

    res.status(200).json({
        message: "user fetched sucessfully",
        user
    })
}

async function logoutController(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "Ex", 60 * 60 * 24)

    res.status(200).json({
        message: "logout sucessfully"
    })
}


module.exports = { registerUserController, loginUserController, getMeController, logoutController }