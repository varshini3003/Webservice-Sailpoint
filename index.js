const express = require("express");
const port = 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const fs = require("fs");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", // Change your password set according to your MySQL
});

db.connect(async (err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL.");

  try {
    const dbName = "CDW_BANK";
    const checkDBQuery = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbName}';`;

    const result = await executeQuery(db, checkDBQuery);

    if (result.length === 0) {
      const migrationFilePath = "Data.sql"; 
      const sql = fs.readFileSync(migrationFilePath, "utf-8");
      const queries = sql.split(";").filter((query) => query.trim());
      for (const query of queries) {
        await executeQuery(db, query);
      }
      console.log(
        "CDW_BANK Database created and migration completed successfully. Check your MySQL and refer the tables and records in the database. Now run the node server to view the endpoints."
      );
    } else {
      const app = express();
      const accountsRouter = require("./routes/accounts");
      app.use("/accounts", accountsRouter);
      const groupsRouter = require("./routes/groups");
      app.use("/groups", groupsRouter);
      const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "Accounts and Entitlements APIs",
            version: "1.0.0",
            description:
              "A sample web service that has endpoints providing you the necessary account and entiltment information of the employees in CDW Bank.",
          },
          servers: [
            {
              url: "http://localhost:3000",
            },
          ],
        },
        apis: ["./routes/*.js"],
      };
      const specs = swaggerJSDoc(options);

      app.get("/", (req, res) => {
        res.send("Hello World");
      });
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
      app.listen(port, () => {
        console.log(`Server is listening on ${port} port`);
      });
    }
    db.end();
  } catch (err) {
    console.error("Error running migration:", err);
    db.end();
  }
});

function executeQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
