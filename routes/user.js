const router = require("express").Router()
const userController = require("../controller/usercontroller")

router.post("/login",userController.login)
router.post("/register",userController.register)
router.post("/googleSign",userController.googleSign)

module.exports = router