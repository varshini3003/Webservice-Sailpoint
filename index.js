const express = require('express');
const port = 3000;
const accountsRouter = require("./routes/accounts");
const groupsRouter = require("./routes/groups");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Accounts and Entitlements API",
         version: "1.0.0",
         description: "A sample web service"
      },
      servers: [
         {
            url: "http://localhost:3000"
         }
      ],
   },
   apis: ["./routes/*.js"]
};
const specs = swaggerJSDoc(options);
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/accounts", accountsRouter);
app.use("/groups", groupsRouter);
app.listen(port, ()=>{
   console.log(`server is listening on ${port} port`);
});