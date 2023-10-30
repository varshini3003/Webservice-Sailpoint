const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));
const port = 3001;
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost", //host.docker.internal
  user: "root",
  password: "password",
  database: "SAMPLE_DB"
});
let accounts, groups, user_groups, group_members;
/*
    Querying the accounts and entitlements from the database and storing them in JSON format
*/
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
   con.query("SELECT * FROM SAMPLE_DB.MYGROUPS", function (err, result, fields) {
      if (err) {
         console.error(err.stack);
         return;
      }
      groups=JSON.stringify(result);      
   });
});

/*
    This base endpoint is for testing
*/
app.get('/', (req, res) => {
    res.send('Hello World! Testing connection');
});

/*
    This endpoint sends the accounts as response
*/
app.get('/accounts', (req, res) => { 
   res.setHeader('Content-Type', 'application/json');
   console.log(accounts);
   res.end(accounts);  
});

/*
    This endpoint sends the entitlements as response
*/
app.get('/groups', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(groups);
});

/*
    This endpoint sends the groups for a given user as response - User to Group relationship
*/
app.get('/accounts/:id/groups', (req, res) => {
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

/*
    This endpoint sends the group members as response - Group to user relationship
*/
app.get('/groups/:id/accounts', (req, res) => {
   res.setHeader('Content-Type', 'application/json');
   const group_id = req.params.id;
   console.log(group_id);
   con.query("SELECT Employee_id FROM SAMPLE_DB.USER_GROUPS WHERE Group_id = ?", [group_id], function (err, result, fields) {
      if (err) {
         console.error(err.stack);
         return;
      }
      group_members=JSON.stringify(result);      
   });
   console.log(group_members);
   res.end(group_members);
 });

/*
    This endpoint enables an account in the target system
*/
app.post('/accounts/enable/:id', bodyParser.json(),(req, res)=>{  
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

/*
    This endpoint disables an account in the target system
*/
app.post('/accounts/disable/:id', bodyParser.json(),(req, res)=>{  
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

/*
    This endpoint creates an account in the target system
*/
app.post('/accounts/create/:id', bodyParser.json(),(req, res)=>{  
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


/*
    This endpoint adds an entitlement in the target system when the account is granted an access
*/
app.put('/accounts/:id/group',bodyParser.json(),(req, res)=>{  
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

/*
    This endpoint removes an entitlement in the target system when the account is revoked an access
*/
app.delete('/accounts/:id/group',bodyParser.json(),(req, res)=>{  
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
 
app.listen(port, ()=>{
   console.log(`server is listening on ${port} port`);
});

// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(3002);

// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Node.js\n');
// }).listen(3000, "172.19.17.233");

