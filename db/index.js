var mysql = require('mysql');
var bcrypt = require('bcrypt');
var config = require('../config');
console.log(config.host, config.user, config.password, config.datebase);
var connection = mysql.createPool({
  connectionLimit: 10,
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
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
    var str = `(${pizzaId}, ${row.id}, 0)`;
    arr.push(str);
  }
  for (var row of body.friendToppings) {
    var str = `(${pizzaId}, ${row.id}, 1)`;
    arr.push(str);
  }
  arr = arr.join(', ');
  connection.query(`INSERT INTO pizza_toppings(pizza_id, topping_id, side_id) VALUES ${arr}`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getPizza = function(pizzaId, callback) {
  connection.query(`SELECT s.name as size_name, c.name as crust_name, p.price, t.name as topping_name, pt.side_id
                    FROM pizzas p
                    INNER JOIN crusts c
                      ON c.id = p.crust_id
                    INNER JOIN sizes s
                      ON s.id = p.size_id
                    INNER JOIN pizza_toppings pt
                      ON pt.pizza_id = p.id
                    INNER JOIN toppings t
                      ON t.id = pt.topping_id
                    WHERE p.id = ${pizzaId}`,
                    function(err, results, fields) {
    if(err) {
      console.log(err, 'err');
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
      if(err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  });
};

var verifyUser = function(username, password, callback) {
  connection.query(`SELECT * FROM users WHERE username = '${username}'`, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      if (results.length === 1) {
        bcrypt.compare(password, results[0].password, function(err, res) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, res, results[0].id);
          }
        });
      } else {
        callback(null, false);
      }
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
  verifyUser,
  getPizza
};
