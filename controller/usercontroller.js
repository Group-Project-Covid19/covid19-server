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

    static googleSign(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email =''
        client.verifyIdToken({
            idToken:req.body.id_token,
            audience:process.env.CLIENT_ID
        })

        .then(ticket =>{
            email = ticket.getPayload().email

            return User.findOne({
                where: {
                    email
                }
            })
            .then(data=>{
                if(data){                
                let user = {                    
                    id : data.id,
                    email: data.email                    
                    }                   
                    let token = generateToken(user)
                    res.status(200).json({
                        msg:'Succes find user',
                        Data:{
                            'id':user.id,
                            'email':user.email,
                            'token': token 
                        }
                    })
                 } else {
                   return User.create({
                        email,
                        password:"default_google"
                    })                    
                 }
            })
            
            .then(result =>{
                let user = {
                    id:result.id,
                    email:email
                }
                let token = generateToken(user)
                res.status(201).json({
                    msg:'Succes Create User',
                    Data:{
                        'id':user.id,
                        'email':user.email,
                        'token': token 
                    }
                })
            })
            .catch(err=>{
                res.status(500).json({
                    'msg':"Internal Server Error",
                    'error':err
                })
            })

        })

    }
}

module.exports = UserController