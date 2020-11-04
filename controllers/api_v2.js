// API Version 1  ------------------
const config = require('../config.js');
var mysql = require('mysql')
var express = require("express");
var apiv2 = express.Router();

apiv2.get('/', function(req, res) {
  res.send('Hello from apiv2 root route.');
});

// middleware 
const middlewareX = require("../middleware/middlewareX")
 
// ====================
// INSERT ROUTES HERE

// =====================
module.exports = apiv2;
