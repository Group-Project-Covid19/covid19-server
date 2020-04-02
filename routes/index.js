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
router.get('/data', Controller.GetData);
router.get('/weather', Controller.weather);

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/googleSignIn", UserController.googleSign);

module.exports = router
