var express = require("express");
//npm install cors
var cors = require('cors');
var app = express();
var mysql = require('mysql')

app.use(cors());
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    /*
    //var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'serverwerx'
    })

    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
    var data = row[0].solution;
    })
*/
   

    res.json(["Tony","Lisa","Michael","Ginger","Food"]);

   //connection.end()

   });




 