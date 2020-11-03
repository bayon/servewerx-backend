//=====
const config = require('./config.js');
//====
var express = require("express");
var cors = require('cors');
var app = express();
var mysql = require('mysql')

app.use(cors());
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

app.get("/url",(req, res, next) => {
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