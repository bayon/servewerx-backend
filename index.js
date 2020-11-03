var express = require("express");
var cors = require('cors');
var app = express();
var mysql = require('mysql')

app.use(cors());
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/",(req,res, next) => {
    res.json(["testing","blank"])
});

app.get("/url",(req, res, next) => {
//NOTE: Could NOT access mysql with user 'api', had to use 'root'. Spent several hours trouble shooting.
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'servewerx',
  port: '3306'
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