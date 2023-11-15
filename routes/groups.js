const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

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
}); 
 /**
  * @swagger
  * /groups:
  *   get:
  *     summary: Returns the entitlements
  *     tags: [Groups]
  *     requestBody:
  *       required: true
  *       description: Other attributes required in request body for pagination
  *       content: 
  *         application/json: 
  *           schema:
  *             type: array
  *             items: 
  *               $ref: '#components/schemas/Group - Required Attributes in Body for pagination'
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
   console.log(req);
   const limit = requestBody.limit;
   const offset = requestBody.offset;
   console.log(limit+" "+offset);
   let groups;
    res.setHeader('Content-Type', 'application/json');
    db.query("SELECT * FROM CDW_BANK.ENTITLEMENTS LIMIT ? OFFSET ?; ",[limit, offset], function (err, result, fields) {
      if (err) {
         console.error(err.stack);
         return;
      } 
      groups=JSON.stringify(result);  
      console.log(groups);  
      res.send(groups);  
   });
 });
module.exports = router;
  