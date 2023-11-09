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
let accounts, user_groups;
con.connect(function(err) {
    if (err) {
       console.error(err.stack);
       return;
    }
    con.query("SELECT * FROM SAMPLE_DB.ACCOUNTS", function (err, result, fields) {
       if (err) {
          console.error(err.stack);
          return;
       }
       accounts=JSON.stringify(result);      
    });
 });

 /**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         Employee_id:
 *           type: string
 *           description: Employee id
 *         firstname:
 *           type: string
 *           description: First name
 *         lastname:
 *           type: string
 *           description: Last name
 *         email:
 *           type: string
 *           description: Email
 *         Account_status:
 *           type: string
 *           description: Account status in this source
 *       example:
 *         Employee_id: ICC190
 *         firstname: Varshini
 *         lastname: S
 *         email: vars@cdw.com
 *         Account_status: A
 *     Group:
 *       type: object
 *       properties:
 *         Group_id:
 *           type: string
 *           description: Group id
 *         Group_name:
 *           type: string
 *           description: Group name
 *         Group_description:
 *           type: string
 *           description: Group description
 *       example:
 *         Group_id: RBA7
 *         Group_name: Bowler
 *         Group_description: Can only bowl
 *     User-Groups:
 *       type: object
 *       properties:
 *         Group_id:
 *           type: group
 *           description: Groups associated with the account, Can be multi-valued
 *       example:
 *         Group_id: RBA3
 */

 /**
  * @swagger
  * /accounts:
  *   get:
  *     summary: Returns the list of accounts with 5 details - Employee_id, firstname, lastname, email, Account_status
  *     tags: [Accounts]
  *     responses:
  *       200:  
  *         description: The list of accounts or users
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/Account'
  *       
  */
router.get('/', (req, res) => { 
    res.setHeader('Content-Type', 'application/json');
    console.log(accounts);
    res.send(accounts);  
 });

 /**
  * @swagger
  * /accounts/{id}/groups:
  *   get:
  *     summary: Returns the list of groups associated with the given account
  *     tags: [Groups for the given account] 
  *     responses:
  *       200:  
  *         description: The list of accounts or users
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/User-Groups'
  *     
  */
 router.get('/:id/groups', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const account_id = req.params.id;
    console.log(account_id);
    con.query("SELECT Group_id FROM SAMPLE_DB.USER_GROUPS WHERE Employee_id = ?", [account_id], function (err, result, fields) {
       if (err) {
          console.error(err.stack);
          return;
       }
       user_groups=JSON.stringify(result);      
    });
    console.log(user_groups);
    res.end(user_groups);
 });
 router.post('/enable/:id', bodyParser.json(),(req, res)=>{  
    console.log(req.params.id);
    res.end("User set active");
    const updateQuery = "UPDATE SAMPLE_DB.ACCOUNTS SET Account_status = 'A' WHERE Employee_id = ?";
    const userId = req.params.id; 
    con.query(updateQuery, [userId], (error, results) => {
    if (error) {
       console.error('Error enabling user:', error);
       return;
    }
    console.log('User enabled successfully.');
    });
 });
 router.post('/disable/:id', bodyParser.json(),(req, res)=>{  
    console.log(req.params.id);
    res.end("User set inactive");
    const updateQuery = "UPDATE SAMPLE_DB.ACCOUNTS SET Account_status = 'I' WHERE Employee_id = ?";
    const userId = req.params.id; 
    con.query(updateQuery, [userId], (error, results) => {
    if (error) {
       console.error('Error disabling user:', error);
       return;
    }
    console.log('User disabled successfully.');
    });
 });
 router.put('/:id', bodyParser.json(),(req, res)=>{  
    const postData = req.body;
    console.log(postData);
    res.send("Created account successfully");
    const account_id = req.params.id;
    const group_id = postData.Group_id;
    const firstName = postData.firstName;
    const lastName = postData.lastname;
    const email = postData.email;
    const Account_status = 'A';
    var insertQuery = "INSERT INTO SAMPLE_DB.ACCOUNTS VALUES (?, ?, ?, ?, ?)";
    con.query(insertQuery, [account_id,firstName,lastName,email,Account_status],function (err, result) {
       if (err) {
          console.error('Error creating user:', err);
          return;
       }
    });
    var sql = "INSERT INTO SAMPLE_DB.USER_GROUPS VALUES (?, ?)";
    con.query(sql, [account_id,group_id],function (err, result) {
       if (err) {
          console.error('Error creating user:', err);
          return;
       }
    });
 });
 

 router.post('/:id',bodyParser.json(),(req, res)=>{  
    const postData = req.body;
    console.log(postData);
    res.send("Added entitlement to the user successfully");
       var sql = "INSERT INTO SAMPLE_DB.USER_GROUPS VALUES (?, ?)";
       const account_id = req.params.id;
       const group_id = postData.Group_id;
       console.log(group_id);
       con.query(sql, [account_id,group_id],(err, result)=>{
          if (err) {
             console.error('Error updating user:', err);
             return;
          }
       });
 });
 

 router.delete('/:id',bodyParser.json(),(req, res)=>{  
     const postData = req.body;
     console.log(postData);
     res.send("Removed entitlement from the user successfully");
        var sql = "DELETE FROM SAMPLE_DB.USER_GROUPS WHERE Employee_id =? AND Group_id=?";
        const account_id = req.params.id;
        const group_id = postData.Group_id;
        console.log(group_id);
        con.query(sql, [account_id], group_id,(err, result)=>{
           if (err) {
              console.error('Error updating user:', err);
              return;
           }
        });
  });

  module.exports = router;
  