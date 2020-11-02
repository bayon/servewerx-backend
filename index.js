var express = require("express");
var app = express();
app.listen(3003, () => {
 console.log("Server running on port 3003");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });