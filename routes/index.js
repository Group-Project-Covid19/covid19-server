const router = require('express').Router()
const UserController = require('../controller/usercontroller')
const Controller = require('../controller/controller')
const user = require("../routes/user")
//Untuk ngetes home jalan
router.get('/', function(req, res) {
    res.status(200).json({
        message:'Home Domain Connected'
    })
}) 

router.get('/main', )
router.use("/user",user)

module.exports = router
