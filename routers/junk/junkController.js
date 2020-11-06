// API Version Test  ------------------
require("dotenv").config();
const config = require("../../config.js");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const db_conn = require("../../db/connection");

//middleware
const middlewareX = require("../../middleware/middlewareX");

//===============================================================================
route.get("/", middlewareX(), (req, res, next) => {
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query("SELECT * FROM servewerx.junk", function (err, rows, fields) {
    if (err) throw err;
    var data = [];
    rows.map((row) => {
      data.push(row);
    });
    res.json(data);
  });
  conn.end();
});

route.get("/:id", middlewareX(), (req, res, next) => {
  const id = Number(req.params.id);
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(`SELECT * FROM servewerx.junk WHERE id = ${id}`, function (
    err,
    rows,
    fields
  ) {
    if (err) throw err;
    var data = [];
    rows.map((row) => {
      data.push(row);
    });
    res.json(data);
  });
  conn.end();
});

route.post("/junk", (req, res) => {
  const _junk = req.body;
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(
    `INSERT INTO servewerx.junk (name,age) VALUES ('${_junk.name}','${_junk.age}')`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).send(`insert id:${rows.insertId}`);
    }
  );
  conn.end();
});

route.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const _junk = req.body;
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(
    `UPDATE servewerx.junk SET name = '${_junk.name}', age = '${_junk.age}' WHERE id = ${id}`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).send(`Update Success msg:${rows.message}`);
    }
  );
  conn.end();
});
route.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!db_conn()) {
    res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
  }
  var conn = db_conn();
  conn.query(`DELETE FROM servewerx.junk WHERE id = ${id}`, function (
    err,
    rows,
    fields
  ) {
    if (err) throw err;
    console.log("rows:", rows);
    res.status(200).send(`DELETE Success affected rows:${rows.affectedRows}`);
  });
  conn.end();
});

module.exports = route;
