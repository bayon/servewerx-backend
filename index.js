//=====
const config = require('./config.js');
require('dotenv').config()
const cookieParser = require('cookie-parser')
var cors = require('cors');
//====
var express = require("express");
var app = express();
// Routers:
var apivTest = require('./routers/api_vTest')
var apiv1 = require('./routers/api_v1')
var apiv2 = require('./routers/api_v2')


var mysql = require('mysql')
const bodyParser = require("body-parser")
const path = require("path")
const jwt = require('jsonwebtoken')

 
//globals
global.server = {}
global.server.port = process.env.PORT
global.server.env = process.env.NODE_ENV
global.server.appRoot = path.resolve(__dirname)
//console.log("global.server:",global.server)

//logging 
const morgan = require("morgan")
const winston = require("./log_config/winston.js")
app.use(morgan("combined", { stream: winston.stream }))
//cors
app.use(cors());
//post parsing 
app.use(express.json()); 

//middleware 
const middlewareB = require("./middleware/middlewareX")
 

app.listen(4000, () => {
 console.log("Server running on port 4000");
});

console.log("NODE_ENV:",process.env.NODE_ENV  )
console.log("HOST:",process.env.HOST)
console.log("PORT:",process.env.PORT)
console.log("DB_PORT:",process.env.DB_PORT)
console.log("DB_PWD:",process.env.DB_PWD)

console.log(`config.HOST: ${config.HOST}`)
console.log(`config.PORT: ${config.PORT}`)

 //console.log("process.env:",process.env)

/* WAS NOT WORKING ON PRODUCTION
app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});
*/
//routes
app.get("/",(req,res, next) => {
    res.json(["testing","blank"])
});
// ROUTING TO CONTROLLERS: 
app.use('/api/v1', apiv1);
app.use('/api/vTest', apivTest);
app.use('/api/v2', apiv2);
