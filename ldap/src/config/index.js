let DB_URI = "mongodb://localhost:27017/microservices";

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

let AD_CONFIG = {
  url: 'ldap://192.168.3.99:389',
  baseDN: 'dc=sgpltech,dc=com',
  attributes: {
    user: ['*'],
    group: ['*']
  }
}

module.exports = {
  DB_URI, AD_CONFIG
};
