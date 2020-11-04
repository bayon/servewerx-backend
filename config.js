// config.js

//Development: must uncomment for development

  
    process.env.NODE_ENV = "development"
    process.env.HOST = "localhost"
    process.env.PORT = 3000
    process.env.DB_PORT = 8889
    process.env.DB_PWD = "root"
  

  module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_PORT: process.env.DB_PORT || 3306,
    DB_PWD: process.env.DB_PWD || 'password123'
  }