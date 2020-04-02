const {User} = require("../models");
const {getToken} = require("../helpers/jwt");
const {decrypt} = require("../helpers/bcrypt");
const {OAuth2Client} = require('google-auth-library');

class UserController {

    static register(req, res) 
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

    static login(req, res) 
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

    static googleSign(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email;
        client.verifyIdToken({
            idToken : req.body.id_token,
            audience : process.env.CLIENT_ID
        })
        .then(result => {
            email = result.payload.email

            return User.findOne({
                where : { email }
            })
            .then(data => {
                if (data){
                    
                    let user = {
                        id : data.id,
                        email : data.email,
                    }

                    let token = getToken(user)

                    res.status(200).json({
                        message : 'login success !!',
                        'id' : user.id,
                        'email' : user.email,
                        'accessToken' : token
                    })
                } else {
                    let newUser = {
                        email : result.payload.email,
                        password : 'default_google'
                    }

                    return User.create(newUser)
                    .then(data => {

                        let user =  {
                            id : data.id,
                            email : data.email
                        }
            
                        let token = getToken(user);
            
                        res.status(201).json({
                            message : 'success add user !!',
                            'id' : data.id,
                            'email' : data.email,
                            'accessToken' : token
                        })

                    })
                    .catch(err => {
                        next(err)
                    })
                }
            })   
        })

    }
}

module.exports = UserController