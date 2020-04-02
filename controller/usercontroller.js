const {User} = require("../models")
const {decryptPassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');

class UserController {

    static register(req,res,next){
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(payload);
        
        User.create(payload)
        .then(result =>{
            let user = {
                id:result.id,
                email:result.email
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
    }


    static login(req,res,next){
        let payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where:{
                email:payload.email
            }
        })

        .then(result=>{
            if(result){
                
                let compare = decryptPassword(payload.password,result.password)
                if(compare){
                    let user = {
                        id: result.id,
                        email: result.email
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
                }else {
                    res.status(400).json({
                        'type':'Bad Request',
                        'msg':'Invalid Email/password'
                    })
                }
            
            }else{
                res.status(400).json({
                    'type':'Bad Request',
                    'msg':'Invalid Email/password'
                })
            }

        })

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