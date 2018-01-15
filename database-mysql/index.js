var mysql = require('mysql');
var config = require('../config.js');
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
  connection.query('SELECT * FROM crusts', function(err, results, fields) {
    if(err) {
      console.log('err');
      callback(err, null);
    } else {
      // console.log('data');
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

var getAllToppings = function(callback) {
  connection.query('SELECT * FROM toppings', function(err, results, fields) {
    if(err) {
      console.log('err');
      callback(err, null);
    } else {
      // console.log('data');
      callback(null, results);
    }
  });
};

var saveOrder = function(callback) {
  connection.query('SELECT * FROM toppings', function(err, results, fields) {
    if(err) {
      console.log('err');
      callback(err, null);
    } else {
      console.log('data');
      callback(null, results);
    }
  });
};

module.exports.getAllToppings = getAllToppings;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllOrders = getAllOrders;
module.exports.getAllPizzas = getAllPizzas;
module.exports.getAllCrusts = getAllCrusts;
module.exports.getAllSizes = getAllSizes;
module.exports.saveOrder = saveOrder;
