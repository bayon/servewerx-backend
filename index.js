var express = require("express");
//npm install cors
var cors = require('cors');
var app = express();
var mysql = require('mysql')

app.use(cors());
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
var IN_DEV = true;
var MYSQL_PORT = 3306
var MYSQL_PASSWORD = "password123"
if(IN_DEV){
    MYSQL_PORT = 8889
    MYSQL_PASSWORD = 'root'
}
app.get("/url", (req, res, next) => {
    
    //var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'api',
    password: MYSQL_PASSWORD,
    database: 'servewerx',
    port:MYSQL_PORT
    })
    var data 
    connection.connect()
    connection.query('SELECT * FROM servewerx.junk', function(err, rows, fields){
        if(err) throw err 
        console.log("rows:",rows);
        console.log("row[0]:",rows[0].name);
        data = rows[0].name;
        res.json(["Tony","Lisa","Michael","Ginger","Food",data]);
    })

   connection.end()

   });




 