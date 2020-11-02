const express = require("express");
var router = express.Router();
let ldapService = require("../services/ldap.service");

router.get("/", (req, res) => {
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

router.post("/api/v1/ldap/authenticate", async (req, res) => {
  ldapService
    .authenticateUser(req.body.username, req.body.password)
    .then((response) => {
      res.send(response);
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

module.exports = router;
