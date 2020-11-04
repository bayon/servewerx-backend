'use strict' 

const config = require('../config.js');
var mysql = require('mysql')

module.exports = function () { 
     var connection =   mysql.createConnection({
    //NOTE: Could NOT access mysql with user 'api', had to use 'root'. Spent several hours trouble shooting.

        host: 'localhost',        // same
        user: 'root',             // same
        password: config.DB_PWD,  // production: password123   // development: root
        database: 'servewerx',    // same
        port: config.DB_PORT      // production: 3306          // development: 8889
    })

    return connection;
    
};
 