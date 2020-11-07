'use strict' 

const config = require('../config.js');
var mysql = require('mysql')

module.exports = function () { 
    console.log("CONFIG VARS:",config);
     var connection =   mysql.createConnection({

       
    //NOTE: Could NOT access mysql with user 'api', had to use 'root'. Spent several hours trouble shooting.

        host: config.HOST,        // same
        user: config.USER,             // same
        password: config.DB_PWD,  // production: password123   // development: root
        database: config.DB_NAME,    // same
        port: config.DB_PORT      // production: 3306          // development: 8889
    })

    return connection;
    
};
 