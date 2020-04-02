let {User} = require("../models");
let {verify} = require("../helpers/jwt");

function authentication(req, res, next)
{
    try 
    {
        let id = verify(req.headers.token);
        User.findByPk(id)
        .then(data =>
        {
            if(!data)
                return res.status(404).json({error : "You must Log in"});
            next();
        })
        .catch(err => res.status(401).json({error : "Unauthorized"}));
    } 
    catch(err) 
    {
        res.status(500).json({error : "Token error"});
    }
}

module.exports = { authentication };