const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "user you are trying to follow does not exist"
        })
    }

    const isAlreadyRequested = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyRequested) {
        if(isAlreadyRequested.status === "accepted"){
            return res.status(200).json({
                message: `you are already following ${followeeUsername}`,
                follow: isAlreadyRequested
            })
        }
        if(isAlreadyRequested.status === "pending"){
            return res.status(200).json({
                message: `follow request already sent to ${followeeUsername}`,
                follow: isAlreadyRequested
            })
        }
        isAlreadyRequested.status = "pending"
        await isAlreadyRequested.save()
        return res.status(200).json({
            message: `follow request sent again to ${followeeUsername}`,
            follow: isAlreadyRequested
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `follow request sent to ${followeeUsername}`,
        follow: followRecord
    })

}

async function handlerFollowRequest(req,res){
    const followeeUsername = req.user.username
    const {followerUsername,action} = req.body

    if(!["accept","reject"].includes(action)){
        return res.status(400).json({
            message: "invalid action. use 'accept' or 'reject'"
        })
    }

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!followRequest){
        return res.status(404).json({
            message: "no pending follow request found"
        })
    }

    if(followRequest.status === "accepted"){
        return res.status(200).json({
            message: "you already accepted the request",
        })
    }

    if(followRequest.status === "pending"){
        followRequest.status = action === "accept" ? "accepted" : "rejected"
        await followRequest.save()
    
        res.status(200).json({
            message: `you have ${action}ed follow request from ${followerUsername}`,
            follow: followRequest
        })
    }
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `you are not following ${followeeUsername} `
        })
    }

    await followModel.findOneAndDelete(isUserFollowing)

    return res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`
    })

}

module.exports = { followUserController, unfollowUserController, handlerFollowRequest }