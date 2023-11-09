const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "password", //Change your password as set for your MySQL setup
    database: "SAMPLE_DB"
  });
let groups;
con.connect(function(err) {
    if (err) {
       console.error(err.stack);
       return;
    }
    con.query("SELECT * FROM SAMPLE_DB.MYGROUPS", function (err, result, fields) {
       if (err) {
          console.error(err.stack);
          return;
       }
       groups=JSON.stringify(result);      
    });
 });

 /**
  * @swagger
  * /groups:
  *   get:
  *     summary: Returns the entitlements
  *     tags: [Groups]
  *     responses:
  *       200:  
  *         description: The list of groups
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/Group'
  *       
  */
router.get('/', (req, res) => { 
    res.setHeader('Content-Type', 'application/json');
    console.log(groups);
    res.send(groups);  
 });
module.exports = router;
  