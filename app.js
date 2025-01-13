const express = require("express");
const cors = require("cors");

const app = express();
module.exports = app;

var corsOptions = {
  origin: "http://localhost:3001",
};

// Generate openapi
const expressOasGenerator = require("express-oas-generator");
expressOasGenerator.init(app, {});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to wms service." });
});


//use the routes
require("./app/routes/authentication.routes")(app);
require("./app/routes/division.routes")(app);