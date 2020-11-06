
// API Version Test  ------------------
require("dotenv").config();
const config = require("../../config.js");
const cookieParser = require("cookie-parser");
var mysql = require("mysql");
var express = require("express");
var route = express.Router();
var bodyParser = require("body-parser");

var db_conn = require("../../db/connection");


route.get("/", function (req, res) {
    res.send("List of userController users.");
  });





  module.exports = route;
 