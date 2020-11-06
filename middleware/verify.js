const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.verify = function(req, res, next){
    //let accessToken = req.cookies.jwt
    const authHeader = req.headers['authorization']
    console.log("VERIFY MIDDLEWARE authHeader:",authHeader)

    const accessToken = authHeader && authHeader.split(' ')[1]
    console.log("VERIFY MIDDLEWARE accessToken:",accessToken)
    const final_accessToken = JSON.parse(accessToken)

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }

    var payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        console.log("accessToken:",accessToken)
        console.log(".env ACCESS_TOKEN_SECRET:",process.env.ACCESS_TOKEN_SECRET)
        var secret = process.env.ACCESS_TOKEN_SECRET
        payload = jwt.verify(final_accessToken, secret)
        
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        console.log("VERIFY CATCH e:",e)
        return res.status(401).send(`e:${e}`)
    }
}