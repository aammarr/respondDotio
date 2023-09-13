const express = require("express");
const app = express();
const bodyParser =  require("body-parser");
const session = require('express-session');
const mysql = require('mysql2');

const dotenv = require("dotenv");
dotenv.config();

//mysql
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});



// redis

// passport authentication
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

//body-parser config;
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

// setting view engine
app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  
// passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/login"));
app.use("/api/v1", require("./routes/note.routes"));

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, console.log("Server has started at port " + PORT));