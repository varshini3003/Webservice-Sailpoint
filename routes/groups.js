const express = require('express');
const router = express.Router();
let groups;
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Change your password set according to your MySQL
  database: 'CDW_BANK',
});
db.connect(function(err) {
    if (err) {
       console.error(err.stack);
       return;
    }
    db.query("SELECT * FROM CDW_BANK.ENTITLEMENTS", function (err, result, fields) {
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
  