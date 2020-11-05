'use strict' 

const jwt = require("jsonwebtoken");
/*
const token = () => {
    return(req, res, next) => {
        if(1 === 2){
            res.status(400).send('Server fail at token middleware...')
          }else {
            console.log("token middleware....")
            next()
          }
    }
}
*/
function token(req, res, next) {
    // Gather the jwt access token from the request header
    console.log("TOKEN MIDDLEWARE req.headers:",req.headers) 


    const authHeader = req.headers['authorization']
    console.log("TOKEN MIDDLEWARE authHeader:",authHeader)

    const token = authHeader && authHeader.split(' ')[1]
    console.log("TOKEN MIDDLEWARE token:",token)


    if (token == null) return res.sendStatus(401) // if there isn't any token
    const TOKEN_SECRET =   '2f90a710a4da0832b09f0cBUTTS3730cd9b8d3ff9d42710a4da095a2ce285b0e1af3eb84df6611'

    jwt.verify(token, TOKEN_SECRET , (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }
module.exports = token;