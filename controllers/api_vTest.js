// API Version Test  ------------------
const config = require("../config.js");

require('dotenv').config()
const cookieParser = require('cookie-parser')


var mysql = require("mysql");
var express = require("express");
var apivTest = express.Router();
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var db_conn = require("../db/connection");
apivTest.get("/", function (req, res) {
  res.send("Hello from apivTest root route.");
});

apivTest.get("/users", function (req, res) {
  res.send("List of apivTest users.");
});
//middleware
const middlewareX = require("../middleware/middlewareX");
const auth = require("../middleware/auth");
const token = require("../middleware/token");
const {verify} = require('../middleware/verify')
const {refresh} = require('../middleware/refresh')

//==============

apivTest.get("/junk", middlewareX(), (req, res, next) => {
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query("SELECT * FROM servewerx.junk", function (err, rows, fields) {
    if (err) throw err;
    var data = [];
    rows.map((row) => {
      data.push(row);
    });
    res.json(data);
  });
  conn.end();
});

apivTest.get("/junk/:id", middlewareX(), (req, res, next) => {
  const id = Number(req.params.id);
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(`SELECT * FROM servewerx.junk WHERE id = ${id}`, function (
    err,
    rows,
    fields
  ) {
    if (err) throw err;
    var data = [];
    rows.map((row) => {
      data.push(row);
    });
    res.json(data);
  });
  conn.end();
});

apivTest.post("/junk", (req, res) => {
  const _junk = req.body;
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(
    `INSERT INTO servewerx.junk (name,age) VALUES ('${_junk.name}','${_junk.age}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).send(`insert id:${rows.insertId}`);
    }
  );
  conn.end();
});

apivTest.put("/junk/:id", (req, res) => {
  const id = Number(req.params.id);
  const _junk = req.body;
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(
    `UPDATE servewerx.junk SET name = '${_junk.name}', age = '${_junk.age}' WHERE id = ${id}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).send(`Update Success msg:${rows.message}`);
    }
  );
  conn.end();
});
apivTest.delete("/junk/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(`DELETE FROM servewerx.junk WHERE id = ${id}`, function (
    err,
    rows,
    fields
  ) {
    if (err) throw err;
    console.log("rows:", rows);
    res.status(200).send(`DELETE Success affected rows:${rows.affectedRows}`);
  });
  conn.end();
});
//=========================

function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  // !!! MOVE TO .env FILE
  const TOKEN_SECRET =
    "2f90a710a4da0832b09f0cBUTTS3730cd9b8d3ff9d42710a4da095a2ce285b0e1af3eb84df6611";
  return jwt.sign(username, TOKEN_SECRET, { expiresIn: "1800s" });
}

apivTest.post("/auth/signup", auth(), (req, res, next) => {
  //res.locals.AAA = "monkey"
  //console.log("hashed password?:",password)
  const body = req.body;
  console.log("req.body:", body);
  console.log("req.params:", req.params);
  console.log("res.locals:", res.locals);
var username = req.body.userName;
  //console.log("req:",req)
  if (!db_conn()) {
    console.log("CONNECTION? ? ");
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  var hashed_password = res.locals.hashed_password;

  ///   JWT 

  let payload = { username: username };
  console.log("payload:",payload)
  //create the access token with the shorter lifespan
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  console.log("accessToken:",accessToken)
  //create the refresh token with the longer lifespan
  let refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }
  );
  console.log("refreshToken:",refreshToken);
  res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
  ////
  conn.query(
    `INSERT INTO servewerx.user (userName,password,refresh_token) VALUES ('${body.userName}','${hashed_password}','${refreshToken}')`,
    function (err, rows, fields) {
      if (err) throw err;
      console.log("ERR ? ERR ? err:", err);
      //res.status(200).send(`err:${err}`)
    }
  );


  res.status(200).send(`${accessToken}`);
  conn.end();
});

apivTest.post("/auth/login", (req, res) => {
  // ERRORS:  Cannot read property 'userName' of undefined
  if (!req.body.userName || !req.body.password) {
    return res.status(401).send();
  }
  const body = req.body;
  var username = req.body.userName;
  var password = req.body.password;
  console.log("LOGIN req.body:", body);
  console.log("LOGIN req.params:", req.params);
  //console.log("req:",req)
  if (!db_conn()) {
    res.status(500).send("LOGIN : NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();

  conn.query(
    `SELECT * FROM  servewerx.user WHERE userName = '${username}'`,
    function (err, rows, fields) {
      if (err) throw err;
      //res.status(200).send(`insert id:${rows.insertId}`)
       
      // invalid login appears to stop here
      if (rows.length > 0) {
        //res.status(500).send('NO USERNAME FOUND')!!! cause duplicate headers error...
        
        //comparePassword( body.password, candidatePassword,cb)
        var plainText = req.body.password;
        var hashed = rows[0].password;
        
        bcrypt.compare(plainText, hashed, function (err, result) {
          // result == true
          console.log("BCRYPT CODE")
          if (err) return err;
           //generate a JWT token: ATTEMPT 1:
          //const token = generateAccessToken({ username: req.body.userName });
          //res.status(200).json(token);
          //ATTEMPT 2:
          //use the payload to store information about the user such as username, user role, etc.
          let payload = { username: username };
          console.log("payload:",payload)
          //create the access token with the shorter lifespan
          let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
          });
          console.log("accessToken:",accessToken)
          //create the refresh token with the longer lifespan
          let refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {
              algorithm: "HS256",
              expiresIn: process.env.REFRESH_TOKEN_LIFE,
            }
          );
          console.log("refreshToken:",refreshToken);
          res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
          res.status(200).send(accessToken)
          //res.status(200).send(hashed);
        }); // end of bcrypt
      } else {
        // ? double header error: ? :: res.status(500).send("NOT LEGAL AUTHORIZATION!!!")
        //res.send("MEGA FAIL")
        console.log(" FAIL 2")
        res.status(401).send("not valid login");
      } //end middle condition
    }
  ); // end of function and SQL
  //console.log("LOGIN : final 500 response.");
  /*
function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
 */
  conn.end();
  function cb(args1, args2) {
    console.log("CB...CB");
    console.log(args1, args2);
  }
  function comparePassword(previousPassword, candidatePassword, cb) {
    console.log("comparePassword....");
    bcrypt.compare(previousPassword, candidatePassword, function (
      err,
      isMatch
    ) {
      if (err) return cb(err);
      cb(null, isMatch);
      res.status(200).send(`successful login by existing member user.`);
    });
  }
  //
});
//replace token middleware with verify middleware.

apivTest.get("/token/test", verify, (req, res) => {
  console.log("TEST TOKENS");
  res.status(200).send("success token test");
});

apivTest.post('/refresh', refresh)


//=====================
module.exports = apivTest;

/*
AUTHENTICATION TODOS: 
Document the Results: 

1) sign up on clear slate 
    -good- can not access admin page.
    -good- got token back: "$2b$10$YKpTIHY4AQAHS.4.QVVN.uUIXiFxaakB2K4fsfpORhlZQ20DvUkaq"
    -good- user saved in DB.
    FIXED: -bad- does NOT redirect to the admin page or the home page.

2) login incorrect credentials 
   FIXED: -bad- token: successful login by existing member user.
    FIXED: -bad- CAN access the admin page.
    - good- after log out. can NOT access the admin page.
3) login correct credentials 
   FIXED:  -bad- token is INCORRECTLY stored in local storage. now stored as 'true' 
    -good- CAN access the admin page.
4) token
  FIXED BUT: -bad- Should the 'token' be the hashed password? what should it be ? 
  BUT: it should be a JWT, that is the next ticket.
*/

//================================
// EXAMPLE ROUTES:  https://www.digitalocean.com/community/tutorials/nodejs-express-routing
//  specifically interesting in terms of how it massages the json data.
//=========================================

/*
  let accounts = [
    {
      "id": 1,
      "username": "paulhal",
      "role": "admin"
    },
    {
      "id": 2,
      "username": "johndoe",
      "role": "guest"
    },
    {
      "id": 3,
      "username": "sarahjane",
      "role": "guest"
    }
  ];
  
  apivTest.get('/accounts', (request, response) => {
    response.json(accounts);
  });
  
  apivTest.get('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const getAccount = accounts.find((account) => account.id === accountId);
  
    if (!getAccount) {
      response.status(500).send('Account not found.')
    } else {
      response.json(getAccount);
    }
  });
  
  apivTest.post('/accounts', (request, response) => {
    const incomingAccount = request.body;
    accounts.push(incomingAccount);
    response.json(accounts);
  })
  
  apivTest.put('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const body = request.body;
    const account = accounts.find((account) => account.id === accountId);
    const index = accounts.indexOf(account);
  
    if (!account) {
      response.status(500).send('Account not found.');
    } else {
      const updatedAccount = { ...account, ...body };
  
      accounts[index] = updatedAccount;
  
      response.send(updatedAccount);
    }
  });
  
  apivTest.delete('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const newAccounts = accounts.filter((account) => account.id != accountId);
  
    if (!newAccounts) {
      response.status(500).send('Account not found.');
    } else {
      accounts = newAccounts;
      response.send(accounts);
    }
  });
   
*/

/*
Directions and Notes For JWT implementation: 
npm install express cookie-parser body-parser dotenv json-web-token --save
npm install express cookie-parser   json-web-token --save


*/
