// config.js

 
//Production: must uncomment 
/*
process.env.NODE_ENV = "production"
process.env.HOST = "localhost"
process.env.PORT = 3000
process.env.DB_PORT = 3306
process.env.DB_PWD = "password123"
*/
  module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_PORT: process.env.DB_PORT || 8889,
    DB_PWD: process.env.DB_PWD || 'root'
  }