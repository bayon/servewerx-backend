
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

/*
//========================================================
const express = require('express');
const app = express();
const albumsRouter = require('./routers/albums');
app.use('/albums', albumsRouter); 

//=========================================================
albums = apivTest

const albums = require('express').Router();
const tracks = require('./tracks').Router();
// The fix for our parameters problem
albums.use('/:albumId/tracks', function(req, res, next) {
    req.albumId = req.params.albumId;
    next()
  }, tracks);
module.exports = albums;

//==========================================================
const tracks = require('express').Router();
module.exports = tracks;

//==========================================================
*/