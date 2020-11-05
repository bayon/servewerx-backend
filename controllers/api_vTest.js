// API Version Test  ------------------
const config = require("../config.js");
var mysql = require("mysql");
var express = require("express");
var apivTest = express.Router();
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

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

apivTest.post("/auth/signup", auth(), (req, res, next) => {
  //res.locals.AAA = "monkey"
  //console.log("hashed password?:",password)
  const body = req.body;
  console.log("req.body:", body);
  console.log("req.params:", req.params);
  console.log("res.locals:", res.locals);

  //console.log("req:",req)
  if (!db_conn()) {
    console.log("CONNECTION? ? ");
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  var hashed_password = res.locals.hashed_password;
  conn.query(
    `INSERT INTO servewerx.user (userName,password) VALUES ('${body.userName}','${hashed_password}')`,
    function (err, rows, fields) {
      if (err) throw err;
      console.log("ERR ? ERR ? err:", err);
      //res.status(200).send(`err:${err}`)
    }
  );

  res.status(200).send(`${hashed_password}`);
  conn.end();
});

apivTest.post("/auth/login", (req, res) => {
  // ERRORS:  Cannot read property 'userName' of undefined

  const body = req.body;
  console.log("LOGIN req.body:", body);
  console.log("LOGIN req.params:", req.params);
  //console.log("req:",req)
  if (!db_conn()) {
    res.status(500).send("LOGIN : NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();

  conn.query(
    `SELECT * FROM  servewerx.user WHERE userName = '${body.userName}'`,
    function (err, rows, fields) {
      if (err) throw err;
      //res.status(200).send(`insert id:${rows.insertId}`)
      console.log("LOGIN success rows:", rows); // undefined if NOT found.
      console.log("RESULT rows.length")
      console.log(rows.length)
      // invalid login appears to stop here 
      if (rows.length > 0) {
        //res.status(500).send('NO USERNAME FOUND')!!! cause duplicate headers error...
        console.log(rows[0]);
        console.log(rows[0].userName);
        console.log(rows[0].password);
        //comparePassword( body.password, candidatePassword,cb)
        var plainText = req.body.password;
        var hashed = rows[0].password;
        console.log("LOGIN: plainText:", plainText);
        console.log("LOGIN : hashed:", hashed);
        bcrypt.compare(plainText, hashed, function (err, result) {
          // result == true
          console.log("LOGIN : err:", err);
          if (err) return err;
          console.log("LOGIN : RESULT:", result);
          res.status(200).send(hashed);
        }); // end of bcrypt
      } else {
        // ? double header error: ? :: res.status(500).send("NOT LEGAL AUTHORIZATION!!!")
        //res.send("MEGA FAIL")
        res.status(401).send("not valid login")
      } //end middle condition
     
    }
    
  ); // end of function and SQL
  console.log("LOGIN : final 500 response.")
 
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
