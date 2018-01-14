var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var items = require('../database-mysql');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

io.on('connection', function(socket) {
  console.log('made socket connection ', socket.id);

  socket.on('sendToppingsUpdate', function(toppings) {
    io.sockets.emit('receiveToppingsUpdate', toppings);
  });

  socket.on('sendMessage', function(message) {
    io.sockets.emit('receiveMessage', message);
  });

  socket.on('typing', function(user) {
    socket.broadcast.emit('typing', user);
  });

  socket.on('clearTyping', function(){
    socket.broadcast.emit('clearTyping');
  });

  // socket.on('updateToppings', function(data) {
  //   console.log('trying to send: ', data);
  //   io.sockets.emit('receiveToppingsUpdate', data);
  // });
});


app.get('/sizes', function (req, res) {
  items.getAllSizes(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/toppings', function (req, res) {
  items.getAllToppings(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/crusts', function (req, res) {
  items.getAllCrusts(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/save', function (req, res) {
  console.log('body', req.body);
  items.saveOrder(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
