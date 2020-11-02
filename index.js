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
    
    //var mysql = require('mysql')
    var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'serverwerx',
    port:'8889'
    })
    var data 
    connection.connect()
    connection.query('SELECT * FROM serverwerx.junk', function(err, rows, fields){
        if(err) throw err 
        console.log("rows:",rows);
        console.log("row[0]:",rows[0].name);
        data = rows[0].name;
        res.json(["Tony","Lisa","Michael","Ginger","Food",data]);
    })

   connection.end()

   });




 