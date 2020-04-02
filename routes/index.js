const router = require('express').Router()
const UserController = require('../controller/usercontroller')
const Controller = require('../controller/controller')

//Untuk ngetes home jalan
router.get('/', function(req, res) {
    res.status(200).json({
        message:'Home Domain Connected'
    })
}) 

router.get('/main', )

//object yg digunakan {email, password}
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post('/data', Controller.GetData)

module.exports = router
