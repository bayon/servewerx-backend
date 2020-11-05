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

        // SINGLE QUOTE? nope: var akcess_tokin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY2tAamFjay5jb20iLCJpYXQiOjE2MDQ2MTM2MTcsImV4cCI6MTYwNDYxMzYxN30._kp_METfG69y4YyMc5zFIkYcl2oFGK5nxLNkH1exeI8'
        // BUT MAYBE: got token expired 
        var akkess = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbUBqaW0uY29tIiwiaWF0IjoxNjA0NjE0MTU3LCJleHAiOjE2MDQ2MTQxNTd9.ir8AxO4t9Kjky-bwDYcLGe4hvpIt5bpmUwo-yHXwMV4'
        payload = jwt.verify(final_accessToken, secret)
        
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        console.log("VERIFY CATCH e:",e)
        return res.status(401).send(`e:${e}`)
    }
}