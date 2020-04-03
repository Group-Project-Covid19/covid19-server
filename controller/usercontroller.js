const {User} = require("../models");
const {getToken} = require("../helpers/jwt");
const {decrypt} = require("../helpers/bcrypt");
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios')

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
        let token;
        let ip;
        let covidCountry = []

        User.findOne({where : {email}})
        .then(data =>
        {
            if(!data)
                return res.status(401).json({error : "Invalid email / password"});
        
            if(!decrypt(password, data.password))
                return res.status(401).json({error : "Invalid email / password"});
            
            token = getToken(data.dataValues.id);
            return axios({
                url : 'https://freegeoip.app/json/',
                method: "GET"
            })
        })
        .then(result => {
            ip = result.data
            return axios({
                url: 'https://api.covid19api.com/summary',
                method: 'GET'
            })
        })
        .then(result => {
            // console.log(result)
            for(let i = 0; i < result.data.Countries.length; i++) {
                if(result.data.Countries[i].Country == ip.country_name) {
                    covidCountry.push(result.data.Countries[i])
                }
            }
            console.log(covidCountry)
            return res.status(200).json({
                accessToken: token,
                ip,
                covidCountry
            })
        })
        .catch(err => 
        {
            console.log(err)
            res.status(400).json({error : "Bad Request"});
        })
    }
    
    static GoogleLogin(req, res) {
        
    }

    static googleSign(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email;
        let ip;
        let covidCountry = []
        let token;
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

                    token = getToken(user)
                    return axios({
                        url : 'https://freegeoip.app/json/',
                        method: "GET"
                    })
                    .then(result => {
                        ip = result.data
                        return axios({
                            url: 'https://api.covid19api.com/summary',
                            method: 'GET'
                        })
                    })
                    .then(result => {
                        for(let i = 0; i < result.data.Countries.length; i++) {
                            if(result.data.Countries[i].Country == ip.country_name) {
                                covidCountry.push(result.data.Countries[i])
                            }
                        }
                        console.log(covidCountry)
                        return res.status(200).json({
                            accessToken: token,
                            ip,
                            covidCountry
                        })
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
            
                        token = getToken(user);
            
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