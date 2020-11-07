// config.js

//Development: must uncomment for development

  
    process.env.NODE_ENV = "development"
    process.env.HOST = "localhost"
    process.env.USER = "root"
    process.env.DB_NAME = "servewerx"
    process.env.PORT = 3000
    process.env.DB_PORT = 8889
    process.env.DB_PWD = "root"
  

  module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER = "root",
    DB_NAME: process.env.DB_NAME = "servewerx",
    PORT: process.env.PORT || 4000,
    DB_PORT: process.env.DB_PORT || 3306,
    DB_PWD: process.env.DB_PWD || 'password123'
  }


