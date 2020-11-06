// API Version Test  -------------------------------------------------------------------
require("dotenv").config();
const config = require("../config.js");
const cookieParser = require("cookie-parser");
var mysql = require("mysql");
var express = require("express");
var route = express();
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var db_conn = require("../db/connection");

//Controllers and Routes
var userController = require("./user/userController");
route.use("/users", userController);
var junkController = require("./junk/junkController");
route.use("/junk", junkController);
var authController = require("./auth/authController");
route.use("/auth", authController);

route.get("/", function (req, res) {
  res.send("default api GET endpoint.");
});

module.exports = route;

//=========================================================================================
// EXAMPLE ROUTES:  https://www.digitalocean.com/community/tutorials/nodejs-express-routing
//  specifically interesting in terms of how it massages the json data.
//=========================================================================================
