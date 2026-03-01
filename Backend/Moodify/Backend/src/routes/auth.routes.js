const { Router } = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const router = Router();

router.post('/register', authController.registerUserController)
router.post('/login', authController.loginUserController)
router.get('/get-me', authMiddleware.authUser, authController.getMeController)
router.get('/logout',authController.logoutController)

module.exports = router