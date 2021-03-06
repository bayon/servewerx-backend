// -------    API Version 1  ------------------
const config = require('../config.js');
var mysql = require('mysql')
var express = require("express");
var apiv1 = express.Router();

apiv1.get('/', function(req, res) {
  res.send('Hello from apiv1 root route.');
});

apiv1.get('/users', function(req, res) {
  res.send('List of apiv1 users.');
});
//middleware 
const middlewareX = require("../middleware/middlewareX")
 
//==============

apiv1.get("/junk",middlewareX(),(req, res, next) => {
    //NOTE: Could NOT access mysql with user 'api', had to use 'root'. Spent several hours trouble shooting.
   
    var connection = mysql.createConnection({
      host: 'localhost',        // same
      user: 'root',             // same
      password: config.DB_PWD,  // production: password123   // development: root
      database: 'servewerx',    // same
      port: config.DB_PORT      // production: 3306          // development: 8889
    })
  
    connection.connect()
    var global = "";
    connection.query('SELECT * FROM servewerx.junk', function (err, rows, fields) {
      if (err) throw err
  
        var data_array = [];
        var name = rows[0].name
        var data = rows
        var obj = {}
        obj.name = rows[0].name;
        obj.age = rows[0].age
        var data = JSON.stringify(obj);
        res.json(data)
    })
  
    connection.end()
  
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
  
  apiv1.get('/accounts', (request, response) => {
    response.json(accounts);
  });
  
  apiv1.get('/accounts/:id', (request, response) => {
    const accountId = Number(request.params.id);
    const getAccount = accounts.find((account) => account.id === accountId);
  
    if (!getAccount) {
      response.status(500).send('Account not found.')
    } else {
      response.json(getAccount);
    }
  });
  
  apiv1.post('/accounts', (request, response) => {
    const incomingAccount = request.body;
    accounts.push(incomingAccount);
    response.json(accounts);
  })
  
  apiv1.put('/accounts/:id', (request, response) => {
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
  
  apiv1.delete('/accounts/:id', (request, response) => {
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
module.exports = apiv1;
