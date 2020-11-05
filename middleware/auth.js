'use strict' 

const SALT_WORK_FACTOR = 10;
const saltRounds = 10;
const bcrypt = require('bcrypt');
//https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
const auth = () => {
    return(req, res, next) => {
        var password = req.body.password;
              
        
        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            res.locals.hashed_password = hash;
                console.log("password hashed:",hash)
                next()
        });
 
         
    }
}

module.exports = auth;