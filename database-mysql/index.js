var mysql = require('mysql');
// var config = require(__dirname + '../config');
console.log('config pass', config.password);
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : config.password,
  database : 'pizzeria'
});

var getAllUsers = function(callback) {
  connection.query('SELECT * FROM users', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getAllOrders = function(callback) {
  connection.query('SELECT * FROM orders', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getAllPizzas = function(callback) {
  connection.query('SELECT * FROM pizza', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getAllCrusts = function(callback) {
  connection.query('SELECT * FROM cruts', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


var getAllSizes = function(callback) {
  connection.query('SELECT * FROM sizes', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getAllTopings = function(callback) {
  connection.query('SELECT * FROM toppings', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getAllTopings = getAllTopings;
