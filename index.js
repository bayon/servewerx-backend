var express = require("express");
//npm install cors
var cors = require('cors')
var app = express();
app.use(cors()) 
app.listen(3003, () => {
 console.log("Server running on port 3003");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });





   //install

//use
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})