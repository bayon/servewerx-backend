var express = require("express");
//npm install cors
var cors = require('cors');
var app = express();
app.use(cors());
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'serverwerxAdm1n@##',
    database: 'serverwerx'
    })

    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
    })

   

    res.json(["Tony","Lisa","Michael","Ginger","Food",rows[0].solution]);
    
    connection.end()

   });




 