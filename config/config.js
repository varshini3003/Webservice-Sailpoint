var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "password", //Change your password as set for your MySQL setup
    database: "CDW_BANK",
    multipleStatements: true
  });
module.exports = db;