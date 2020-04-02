const {User} = require("../models");
const {getToken} = require("../helpers/jwt");
const {decrypt} = require("../helpers/bcrypt");

class UserController {

    static Register(req, res) 
    {
        let {email, password} = req.body;
        let data = {email, password};

        User.create(data)
        .then(() => 
        {
            res.status(201).json({msg : "Thank you for your participation"})
        })
        .catch((err) => 
        {
            console.log(err)
            res.status(400).json({error : "Bad Request"});
        })
    }

    static Login(req, res) 
    {
        let {email, password} = req.body;

        User.findOne({where : {email}})
        .then(data =>
        {
            if(!data)
                return res.status(401).json({error : "Invalid email / password"});
        
            if(!decrypt(password, data.password))
                return res.status(401).json({error : "Invalid email / password"});
            
            let token = getToken(data.dataValues.id);
            req.headers.token = token;
            return res.status(200).json({accessToken : token});
        })
        .catch(() => 
        {
            res.status(400).json({error : "Bad Request"});
        })
    }
    
    static GoogleLogin(req, res) {
        
    }
}

module.exports = UserController