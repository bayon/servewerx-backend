// API Version Test  ------------------
require("dotenv").config();
const config = require("../config.js");
const cookieParser = require("cookie-parser");
var mysql = require("mysql");
var express = require("express");
var route = express();
//Controllers and Routes
var userController = require('./user/userController');
route.use('/users',userController)
var junkController = require('./junk/junkController');
route.use('/junk', junkController)
var authController = require('./auth/authController');
route.use('/auth', authController)

var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
var db_conn = require("../db/connection");

route.get("/", function (req, res) {
  res.send("default api GET endpoint.");
});

 
//middleware
const middlewareX = require("../middleware/middlewareX");
const auth = require("../middleware/auth");
const { verify } = require("../middleware/verify");
const { Router } = require("express");
//======================================================
  
// route.post("/auth/signup", auth(), (req, res, next) => {
//   const body = req.body;
//   console.log("req.body:", body);
//   console.log("req.params:", req.params);
//   console.log("res.locals:", res.locals);
//   var username = req.body.userName;

//   if (!db_conn()) {
//     console.log("CONNECTION? ? ");
//     res.status(500).send("NO ENCAPSULATED DB CONNECTION.");
//   }
//   var conn = db_conn();
//   // TODO: 11-06-2020
//   //1st Check To Prevent Duplicate User:: IF NO continue, IF YES, handle whether REFRESHING TOKEN. 



//   var hashed_password = res.locals.hashed_password;

//   let payload = { username: username };
//   console.log("payload:", payload);
//   //create the access token with the shorter lifespan
//   console.log("ACCESS_TOKEN_LIFE:", process.env.ACCESS_TOKEN_LIFE);

//   let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//     algorithm: "HS256",
//     expiresIn: "1h",
//   });
//   console.log("accessToken:", accessToken);
//   //create the refresh token with the longer lifespan
//   let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//     algorithm: "HS256",
//     expiresIn: "1d", //process.env.REFRESH_TOKEN_LIFE,
//   });
//   console.log("refreshToken:", refreshToken);
//   res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
//   ////
//   conn.query(
//     `INSERT INTO servewerx.user (userName,password,refresh_token) VALUES ('${body.userName}','${hashed_password}','${refreshToken}')`,
//     function (err, rows, fields) {
//       if (err) throw err;
//       console.log("ERR ? ERR ? err:", err);
//       //res.status(200).send(`err:${err}`)
//     }
//   );

//   res.status(200).send(`${accessToken}`);
//   conn.end();
// });

// route.post("/auth/login", (req, res) => {
//   if (!req.body.userName || !req.body.password) {
//     return res.status(401).send();
//   }
//   const body = req.body;
//   var username = req.body.userName;
//   var password = req.body.password;
//   console.log("LOGIN req.body:", body);
//   console.log("LOGIN req.params:", req.params);
//   //console.log("req:",req)
//   if (!db_conn()) {
//     res.status(500).send("LOGIN : NO ENCAPSULATED DB CONNECTION.");
//   }
//   var conn = db_conn();

//   conn.query(
//     `SELECT * FROM  servewerx.user WHERE userName = '${username}'`,
//     function (err, rows, fields) {
//       if (err) throw err;
//       // invalid login appears to stop here
//       if (rows.length > 0) {
//         var plainText = req.body.password;
//         var hashed = rows[0].password;
//         var refresh_token = rows[0].refresh_token;

//         bcrypt.compare(plainText, hashed, function (err, result) {
//           if (err) return err;
//           //use the payload to store information about the user such as username, user role, etc.

//           // REFRESH: check the refresh_token to see if legit. if yes, create access token. if no, refuse. User has to sign-up.
//           // CHECK: if refresh_token is in the current query data. Check if still legit.
//           // IF EXISTS AT ALL:
//           //res.status(500).send('NOT A VALID REFRESH TOKEN.')
//           if (!refresh_token) {
//             res.status(403).send("NO REFRESH TOKEN EXISTS.");
//           }

//           console.log(
//             "REFRESH: process.env.REFRESH_TOKEN_SECRET:",
//             process.env.REFRESH_TOKEN_SECRET
//           );
//           var refresh_secret = process.env.REFRESH_TOKEN_SECRET;
//           let refresh_payload = jwt.verify(refresh_token, refresh_secret);
//           console.log("REFRESH: refresh_payload:", refresh_payload);
//           // check refresh_payload.exp
//           console.log("refresh_payload.exp", refresh_payload.exp);
//           if (refresh_payload.exp < new Date().getTime() / 1000) {
//             //YES EXPIRED
//             console.log("EXPIRED");
//             res.status(403).send("YOUR TOKEN HAS EXPIRED, NEED TO RE-SIGNUP");
//             //TODO: How to handle DB when existing user has to get new tokens VS. checking for duplicate email user names.
//           } else {
//             // NO NOT EXPIRED
//             console.log("NOT EXPIRED REFRESH TOKEN")
//             let payload = { username: username };
//             //create the access token with the shorter lifespan
//             let accessToken = jwt.sign(
//               payload,
//               process.env.ACCESS_TOKEN_SECRET,
//               {
//                 algorithm: "HS256",
//                 expiresIn: "1h", //process.env.ACCESS_TOKEN_LIFE,
//               }
//             );
//             console.log("accessToken:", accessToken);
//             //create the refresh token with the longer lifespan
//             res.status(200).send(accessToken);
//           }

//         });
//       } else {
//         res.status(401).send("not valid login");
//       } //end middle condition
//     }
//   ); // end of function and SQL
//   conn.end();
// });

//replace token middleware with verify middleware.

// route.get("/token/test", verify, (req, res) => {
//   console.log("TEST TOKENS");
//   res.status(200).send("success token test");
// });

 
//=====================
module.exports = route;

/*
AUTHENTICATION TODOS: 
Document the Results: 

 JWT REFRESH PROCESS 

*/

//================================
// EXAMPLE ROUTES:  https://www.digitalocean.com/community/tutorials/nodejs-express-routing
//  specifically interesting in terms of how it massages the json data.
//=========================================
