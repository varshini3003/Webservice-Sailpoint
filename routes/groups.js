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
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         Group_id:
 *           type: string
 *           description: Group id
 *         Group_name:
 *           type: string
 *           description: First name
 *         Group_description:
 *           type: string
 *           description: Last name
 *       example:
 *         Group_id: RBA7
 *         Group_name: Bowler
 *         Group_description: Can only bowl
 */
router.get('/', (req, res) => { 
    res.setHeader('Content-Type', 'application/json');
    console.log(groups);
    res.send(groups);  
 });
module.exports = router;
  