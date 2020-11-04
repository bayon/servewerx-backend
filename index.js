//=====
const config = require('./config.js');

//====
var express = require("express");
var cors = require('cors');
var app = express();
var mysql = require('mysql')
const bodyParser = require("body-parser")
const path = require("path")


//globals
global.server = {}
global.server.port = process.env.PORT
global.server.env = process.env.NODE_ENV
global.server.appRoot = path.resolve(__dirname)
//logging 
//configure request logs
const morgan = require("morgan")
const winston = require("./log_config/winston.js")
app.use(morgan("combined", { stream: winston.stream }))

app.use(cors());
app.use(express.json()); //may not need body-parser
//middleware 
const middlewareB = require("./middleware/middlewareX")

const middleware = () => {
  return (req,res,next) => {
    if(1 === 2){
      res.status(400).send('Server fail at middleware...')
    }else {
      next()
    }
  }
}
 

/*
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
*/
console.log("NODE_ENV:",process.env.NODE_ENV  )
console.log("HOST:",process.env.HOST)
console.log("PORT:",process.env.PORT)
console.log("DB_PORT:",process.env.DB_PORT)
console.log("DB_PWD:",process.env.DB_PWD)
console.log("jack",process.env.jack)
//console.log("process.env:",process.env)

app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

app.get("/",(req,res, next) => {
    res.json(["testing","blank"])
});

app.get("/api/v1/junk",middlewareB(),(req, res, next) => {
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

app.get('/api/v1/accounts', (request, response) => {
  response.json(accounts);
});

app.get('/api/v1/accounts/:id', (request, response) => {
  const accountId = Number(request.params.id);
  const getAccount = accounts.find((account) => account.id === accountId);

  if (!getAccount) {
    response.status(500).send('Account not found.')
  } else {
    response.json(getAccount);
  }
});

app.post('/api/v1/accounts', (request, response) => {
  const incomingAccount = request.body;

  accounts.push(incomingAccount);

  response.json(accounts);
})

app.put('/api/v1/accounts/:id', (request, response) => {
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

app.delete('/api/v1/accounts/:id', (request, response) => {
  const accountId = Number(request.params.id);
  const newAccounts = accounts.filter((account) => account.id != accountId);

  if (!newAccounts) {
    response.status(500).send('Account not found.');
  } else {
    accounts = newAccounts;
    response.send(accounts);
  }
});
 
