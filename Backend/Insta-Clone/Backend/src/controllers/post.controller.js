const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file)

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: "user unauthorized"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"file"),
        fileName: "Test",
        folder: "cohort-2"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created sucessfully",
        post
    })
    

}

async function getPostController(req,res){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "unauthorized user"
        })
    }
    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "uniauthorized user"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "posts fetched sucessfully",
        posts
    })
}

async function getPostDetailsController(req,res){
   const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "unauthorized user"
        })
    }
    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "uniauthorized user"
        })
    } 
    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "post fetched sucessfully",
        post
    })
}

module.exports = {createPostController,getPostController,getPostDetailsController}