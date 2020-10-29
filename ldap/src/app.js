const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let ldapService = require("./services/ldap.service");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  let username = "aduser1";
  let password = "Soft@AD001";
  ad.authenticate(username, password, function (err, auth) {
    if (err) {
      console.log("ERROR: " + JSON.stringify(err));
      return;
    }
    if (auth) {
      console.log("Authenticated!");
      res.json({ msg: "ldap service" });
    } else {
      console.log("Authentication failed!");
    }
  });
});

app.post("/api/v1/ldap/authenticate", async (req, res) => {
  ldapService
    .authenticateUser(req.body.username, req.body.password)
    .then((response) => {
      res.send(user);
    });
  // ad.authenticate(req.body.username, req.body.password, function (err, auth) {
  //   if (err) {
  //     console.log('ERROR: ' + JSON.stringify(err));
  //     return;
  //   }
  //   if (auth) {
  //     console.log('Authenticated!');
  //     res.json({ success: true, msg: "User Authenticated Successfully" });
  //   }
  //   else {
  //     console.log('Authentication failed!');
  //     res.json({ success: false, msg: JSON.stringify(err) });
  //   }
  // });
});

module.exports = app;
