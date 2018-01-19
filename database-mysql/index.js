var mysql = require('mysql');
var bcrypt = require('bcrypt');
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

var getAllToppings = function(callback) {
  connection.query('SELECT * FROM toppings', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var savePizza = function(body, callback) {
  connection.query(`INSERT INTO pizzas(size_id, crust_id, price) VALUES (${body.size.id}, ${body.crust.id}, ${body.price})`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var saveToppings = function(pizzaId, body, callback) {
  var arr = [];
  for (var row of body.toppings) {
    var str = `(${pizzaId}, ${row.id})`;
    arr.push(str);
  }
  arr = arr.join(', ');
  connection.query(`INSERT INTO pizza_toppings(pizza_id, topping_id) VALUES ${arr}`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var checkUser = function(username,  callback) {
  connection.query(`SELECT EXISTS(SELECT * FROM users WHERE username = '${username}'`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var saveUser = function(username, password, callback) {
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    connection.query(`INSERT INTO users(username, password) VALUES ('${username}', '${hash}')`, function(err, results, fields) {
      console.log(hash);
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  });
};

var verifyUser = function(username, password, callback) {
  connection.query(`SELECT * FROM users where username = ${username})`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
};

module.exports = {
  getAllToppings,
  getAllUsers,
  getAllOrders,
  getAllPizzas,
  getAllCrusts,
  getAllSizes,
  savePizza,
  saveToppings,
  saveUser,
  checkUser,
  verifyUser
};
