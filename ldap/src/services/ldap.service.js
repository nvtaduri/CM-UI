let CONFIG = require("../config/index");
let ActiveDirectory = require("activedirectory");
let config = {
  url: CONFIG.AD_CONFIG.url,
  baseDN: CONFIG.AD_CONFIG.baseDN,
  attributes: CONFIG.AD_CONFIG.attributes,
};

class ldapService {
  constructor() {}

  async authenticateUser(username, password) {
    return new Promise(async (resolve, reject) => {
      let ad = new ActiveDirectory(config);
      ad.authenticate(username, password, function (err, auth) {
        if (err) {
          console.log("ERROR: " + JSON.stringify(err));
          reject({
            success: false,
            message: "Error while authenticating the user",
            data: "ERROR: " + JSON.stringify(err),
          });
        }
        if (auth) {
          console.log("Authenticated!");
          config["username"] = username;
          config["password"] = password;
          let ad = new ActiveDirectory(config);
          console.log(ad);
          // Fetch User Information from the Active Directory
          ad.findUser(username, function (err, user) {
            if (err) {
              console.log("ERROR: " + JSON.stringify(err));
              return;
            }
            console.log("xxxxxxxxxxxxxxxxxx", user);
            resolve(user);
            // membof = user.memberOf;
            // membof.map(p => splitarr = [...splitarr, ...p.split(',')]);
            // let obj = {};
            // splitarr.map(q => {
            //     let k = q.split('=');
            //     obj[k[0]] = obj[k[0]] ? [...obj[k[0]], k[1]] : [k[1]]
            // })
            // finalRoleList = obj.CN;
            // console.log(finalRoleList, 'finalRoleList');

            // splituserinfo = (Object.assign({}, user.memberOf))[0].split(',');
            // // role = ((Object.assign({}, splituserinfo))[0].split('='))[1];
            // let wherecond = `username='${req.body.username}'`;
            // if (finalRoleList.indexOf('tech-leads') >= 0) {
            //     role = 'tech-leads';
            // } else if (finalRoleList.indexOf('sgpl-users') >= 0) {
            //     role = 'sgpl-users';
            // }
          });
        } else {
          console.log("Authentication failed!");
          reject({
            success: false,
            message: "Error while authenticating the user",
            data: "ERROR: " + JSON.stringify(err),
          });
        }
      });
    });
  }
}

module.exports = new ldapService();
