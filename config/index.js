if (process.env.Host) {
  module.exports = {
    host: process.env.Host,
    user: process.env.User,
    password: process.env.MySQLPassword,
    database: process.env.Database
  };
} else {
  var config = require('./config.example.js');
  module.exports = config;
}
