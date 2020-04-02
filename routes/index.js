const router = require('express').Router()
const UserController = require('../controller/usercontroller')
const Controller = require('../controller/controller')

//Untuk ngetes home jalan
router.get('/', function(req, res) {
    res.status(200).json({
        message:'Home Domain Connected'
    })
}) 



//object yg digunakan {email, password}
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.get('/data', Controller.GetData)
router.post('/googleSignIn', UserController.googleSign);

module.exports = router
