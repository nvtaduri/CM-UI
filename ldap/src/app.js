const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let ldapService = require("./services/ldap.service");
let routes = require("../src/routes/routes");
var cors = require("cors");
var whitelist = [
  "http://localhost:4000",
  "http://localhost:3000",
  "http://localhost:8080",
  "http: //192.168.1.20:3000/",
  "http://192.168.1.20:8080/",
  "http://192.168.1.20:3002/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use("/", routes);

module.exports = app;
