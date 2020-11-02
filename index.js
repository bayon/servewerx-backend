var express = require("express");
//npm install cors
var cors = require('cors');
var app = express();
app.use(cors());
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });




 