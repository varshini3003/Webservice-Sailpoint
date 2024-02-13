const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: false}));
let accounts, userGroups;

var db = require('./database');
db.database = 'CDW_BANK';
const mysql = require('mysql');
const dbConnection = mysql.createConnection(db);

dbConnection.connect(function(err) {
    if (err) {
       console.error(err.stack);
       return;
    }
    dbConnection.query("SELECT * FROM CDW_BANK.EMPLOYEES", function (err, result, fields) {
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
 *         employeeId:
 *           type: string
 *           description: Employee id
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: Last name
 *         email:
 *           type: string
 *           description: Email
 *         accountStatus:
 *           type: string
 *           description: Account status of the employee in this source
 *       example:
 *         employeeId: BNK23190
 *         firstName: Varshini
 *         lastName: S
 *         email: vars@cdw.com
 *         accountStatus: A
 *     Group:
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           description: Group id
 *         groupName:
 *           type: string
 *           description: Group name
 *         groupDescription:
 *           type: string
 *           description: Group description
 *       example:
 *         groupId: RBA7
 *         groupName: Bowler
 *         groupDescription: Can only bowl
 *     User-Groups:
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           description: Groups (Group ids) associated with the employee account (which is in the params), Can be multi-valued
 *       example:
 *         groupId: RBA3
 *     Group - Required Attributes in Body for pagination:
 *       type: object
 *       properties:
 *         limit:
 *           type: Integer
 *           description: Limit 
 *         offset:
 *           type: Integer
 *           description: Offset 
 *       example:
 *         limit: 10
 *         offset: 1
 *     Create Account - Required Attributes in Body:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: Last name
 *         email:
 *           type: string
 *           description: Email
 *         groupId:
 *           type: string
 *           description: Group which is granted to the user
 *       example:
 *         firstName: Varshini
 *         lastName: S
 *         email: vars@cdw.com
 *         groupId: RBA1  
 *     
 */
 /**
  * @swagger
  * /:
  *   get:
  *     summary: Returns a message
  *     tags: [Testing connection - Base URL]
  *     responses:
  *       200:  
  *         description: A Hello World message
  */
 /**
  * @swagger
  * /accounts:
  *   get:
  *     summary: Returns the list of employee accounts with 5 details - employeeId, firstName, lastName, email, accountStatus
  *     tags: [Accounts]
  *     responses:
  *       200:  
  *         description: The list of employee accounts 
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
    const reqBody = req.body;
    console.log(reqBody);
    console.log(accounts);
    res.send(accounts);  
 });

 /**
  * @swagger
  * /accounts/{id}/groups:
  *   get:
  *     summary: Returns the list of groups associated with the given employee account
  *     tags: [Groups for the given employee account] 
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The Employee id 
  *     responses:
  *       200:  
  *         description: The list of groups associated with the given employee account
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/User-Groups'
  *       404:
  *         description: Employee account not found
  *     
  */
 router.get('/:id/groups', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const employeeId = req.params.id;
    console.log(employeeId);
    dbConnection.query("SELECT groupId FROM CDW_BANK.USER_GROUPS WHERE employeeId = ?", [employeeId], function (err, result, fields) {
       if (err) {
          console.error(err.stack);
          return;
       }
       userGroups=JSON.stringify(result);      
    });
    console.log(userGroups);
    res.end(userGroups);
 });
 /**
  * @swagger
  * /accounts/enable/{id}:
  *   post:
  *     summary: Enables an account in the target system
  *     tags: [Enable an account]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The Employee id 
  *     requestBody:
  *       required: false
  *     responses:
  *       200:
  *         description: The account has been enabled in the target system
  */
 router.post('/enable/:id', bodyParser.json(),(req, res)=>{  
    console.log(req.params.id);
    res.end("User set active in the target system");
    const updateQuery = "UPDATE CDW_BANK.EMPLOYEES SET accountStatus = 'A' WHERE employeeId = ?";
    const employeeId = req.params.id; 
    dbConnection.query(updateQuery, [employeeId], (error, results) => {
    if (error) {
       console.error('Error enabling user:', error);
       return;
    }
    console.log('User enabled successfully.');
    });
 });
 /**
  * @swagger
  * /accounts/disable/{id}:
  *   post:
  *     summary: Disables an account in the target system
  *     tags: [Disable an account]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The Employee id
  *     requestBody:
  *       required: false
  *     responses:
  *       200:
  *         description: The account has been disabled in the target system
  */
 router.post('/disable/:id', bodyParser.json(),(req, res)=>{  
    console.log(req.params.id);
    res.end("User set inactive");
    const updateQuery = "UPDATE CDW_BANK.EMPLOYEES SET accountStatus = 'I' WHERE employeeId = ?";
    const employeeId = req.params.id; 
    dbConnection.query(updateQuery, [employeeId], (error, results) => {
    if (error) {
       console.error('Error disabling user:', error);
       return;
    }
    console.log('User disabled successfully.');
    });
 });
 /**
  * @swagger
  * /accounts/{id}:
  *   post:
  *     summary: Creates a new account when an entitlement is granted to the user not existing in this source
  *     tags: [Accounts]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The Employee id
  *     requestBody:
  *       required: true
  *       description: Other attributes required in request body to create employee account in the target 
  *       content: 
  *         application/json: 
  *           schema:
  *             type: array
  *             items: 
  *               $ref: '#components/schemas/Create Account - Required Attributes in Body'
  *     responses:
  *       200:
  *         description: Created account successfully       
  */
 router.post('/:id', bodyParser.json(),(req, res)=>{  
    const postData = req.body;
    console.log(postData);
    res.send("Created account successfully");
    const employeeId = req.params.id;
    const groupId = postData.groupId;
    const firstName = postData.firstName;
    const lastName = postData.lastName;
    const email = postData.email;
    const accountStatus = 'A';
    var insertQuery = "INSERT INTO CDW_BANK.EMPLOYEES VALUES (?, ?, ?, ?, ?)";
    dbConnection.query(insertQuery, [employeeId,firstName,lastName,email,accountStatus],function (err, result) {
       if (err) {
          console.error('Error creating user:', err);
          return;
       }
    });
    var sql = "INSERT INTO CDW_BANK.USER_GROUPS VALUES (?, ?)";
    dbConnection.query(sql, [employeeId,groupId],function (err, result) {
       if (err) {
          console.error('Error creating user:', err);
          return;
       }
    });
 });
 
  /**
  * @swagger
  * /accounts/{id}/add:
  *   post:
  *     summary: Updates an account when an entitlement is granted 
  *     tags: [Accounts]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The Employee id
  *     requestBody:
  *       description: Group Id is required in the request body to update the account details in the target
  *       required: true
  *       content: 
  *         application/json: 
  *           schema:
  *             type: array
  *             items: 
  *               $ref: '#components/schemas/User-Groups'
  *     responses:
  *       200:
  *         description: Updated account successfully 
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/User-Groups'      
  */
 router.post('/:id/add',bodyParser.json(),(req, res)=>{  
    const postData = req.body;
    console.log(postData);
    res.send("Added entitlement to the user successfully");
       var sql = "INSERT INTO CDW_BANK.USER_GROUPS VALUES (?, ?)";
       const employeeId = req.params.id;
       const groupId = postData.groupId;
       console.log(groupId);
       dbConnection.query(sql, [employeeId,groupId],(err, result)=>{
          if (err) {
             console.error('Error updating user:', err);
             return;
          }
       });
 });
  /**
  * @swagger
  * /accounts/{id}/remove:
  *   post:
  *     summary: Updates an account when an entitlement is revoked
  *     tags: [Accounts]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The Employee id
  *     requestBody:
  *       description: Group Id is required in the request body to update the account details in the target
  *       required: true
  *       content: 
  *         application/json: 
  *           schema:
  *             type: array
  *             items: 
  *               $ref: '#components/schemas/User-Groups'
  *     responses:
  *       200:
  *         description: Updated account successfully 
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/User-Groups'      
  */

 router.post('/:id/remove',bodyParser.json(),(req, res)=>{  
     const postData = req.body;
     console.log(postData);
     res.send("Removed entitlement from the user successfully");
        var sql = "DELETE FROM CDW_BANK.USER_GROUPS WHERE employeeId =? AND groupId=?";
        const employeeId = req.params.id;
        const groupId = postData.groupId;
        console.log(groupId);
        dbConnection.query(sql, [employeeId, groupId],(err, result)=>{
           if (err) {
              console.error('Error updating user:', err);
              return;
           }
        });
  });
  module.exports = router;
  