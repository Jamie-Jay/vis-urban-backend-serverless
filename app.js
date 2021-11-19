const express = require('express');
const serverless = require("serverless-http");

const router = require('./router')

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    
    next();
  });

app.use(express.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

app.use(router)

module.exports.handler = serverless(app);