'use strict' 

const middlewareX = () => {
    return(req, res, next) => {
        if(1 === 2){
            res.status(400).send('Server fail at middleware...')
          }else {
            console.log("middlewareX....")
            next()
          }
    }
}

module.exports = middlewareX;