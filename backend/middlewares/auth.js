const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async function (req, res, next){
    let token = req.headers.token
    
    if(!token){
        return res.send("Not logged in")
    }

    try{
        const response = await jwt.verify(token, process.env.user_secret_key);
        if(response){
            req.userId = response.id;
            next();
        }
    }catch(e){
        res.status(403).json({
            message: "You're not logged in"
        })
    }
}

module.exports = auth;