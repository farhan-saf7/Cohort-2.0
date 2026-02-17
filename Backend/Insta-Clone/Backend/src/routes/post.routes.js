const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

postRouter.get("/", identifyUser, postController.getPostController)

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

postRouter.post("/likes/:postId",identifyUser, postController.likePostController)

postRouter.post("/unlikes/:postId",identifyUser, postController.unlikePostController)

module.exports = postRouter