// API Version Test  ------------------
const config = require('../config.js');
var mysql = require('mysql')
var express = require("express");
var apivTest = express.Router();
var db_conn = require('../db/connection')
apivTest.get('/', function(req, res) {
  res.send('Hello from apivTest root route.');
});

apivTest.get('/users', function(req, res) {
  res.send('List of apivTest users.');
});
//middleware 
const middlewareX = require("../middleware/middlewareX")
 
//==============
 
apivTest.get("/junk",middlewareX(),(req, res, next) => {

    if(!db_conn()){
        res.status(500).send('NO ENCAPSULATED DB CONNECTION.')
    }
    var conn = db_conn()
    conn.query('SELECT * FROM servewerx.junk', function (err, rows, fields) {
      if (err) throw err
        var data = [];
        rows.map( row => {
            data.push(row)
        });
        res.json(data)
    })
    conn.end()
  
})
  //================================
  // EXAMPLE ROUTES:  https://www.digitalocean.com/community/tutorials/nodejs-express-routing
  //=========================================
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
   
  







//=====================
module.exports = apivTest;
