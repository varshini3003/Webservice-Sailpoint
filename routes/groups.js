const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.json());
router.use(express.urlencoded({extended: false}));
let groups;
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Change your password set according to your MySQL
  database: 'CDW_BANK',
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
   const requestBody = req.body;
   console.log(requestBody);
   const limit = requestBody.limit;
   const offset = requestBody.offset;
    res.setHeader('Content-Type', 'application/json');
    db.connect(function(err) {
      if (err) {
         console.error(err.stack);
         return;
      }
      db.query("SELECT * FROM CDW_BANK.ENTITLEMENTS LIMIT ? OFFSET ?; ",[limit, offset], function (err, result, fields) {
         if (err) {
            console.error(err.stack);
            return;
         }
         groups=JSON.stringify(result);      
      });
   });
    console.log(groups);
    res.send(groups);  
 });
module.exports = router;
  