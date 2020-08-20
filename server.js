const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const keys = require('./config/keys');

// DATABASE

//mongoose.connect(keys.mongoURI, (err) => {
//  if (err) throw err;
//  else console.log("Successfully connected to MongoDB!");
//});

// R O U T E S

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;