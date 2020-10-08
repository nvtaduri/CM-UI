const express = require("express");
const Book = require("./models/books_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
let ActiveDirectory = require('activedirectory');
let config = {
  url: 'ldap://192.168.3.99:389',
  baseDN: 'dc=sgpltech,dc=com',
  attributes: {
    user: ['*'],
    group: ['*']
  }
}
let ad = new ActiveDirectory(config);

app.get("/", (req, res) => {
  let username = 'aduser1';
  let password = 'Soft@AD001';
  ad.authenticate(username, password, function (err, auth) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return;
    }
    if (auth) {
      console.log('Authenticated!');
      res.json({ msg: "ldap service" });
    }
    else {
      console.log('Authentication failed!');
    }
  });
});

app.post("/api/v1/ldap/authenticate", async (req, res) => {
  ad.authenticate(req.body.username, req.body.password, function (err, auth) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return;
    }
    if (auth) {
      console.log('Authenticated!');
      res.json({ success: true, msg: "User Authenticated Successfully" });
    }
    else {
      console.log('Authentication failed!');
      res.json({ success: false, msg: JSON.stringify(err) });
    }
  });
});

module.exports = app;
