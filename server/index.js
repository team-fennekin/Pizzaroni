var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var db = require('../mysql');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('listening on port ', this.address().port, app.settings.env);
});

var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/../react/dist'));
app.use(bodyParser.json());


var usernames = {};
var rooms = {};

io.on('connection', function(socket) {
  socket.on('addUser', function(username) {
    socket.username = username;
    socket.room = 'lobby';
    usernames[username] = username;
    if (rooms[socket.room] === undefined) {
      rooms[socket.room] = {
        roomName: socket.room,
        roomUsers: {
          [username]: [socket.username, socket.id]
        }
      };
    } else {
      rooms[socket.room].roomUsers[username] = [socket.username, socket.id];
    }

    socket.join('lobby');

    socket.emit('receiveMessage', {
      username: 'SERVER',
      message: 'you have connected to lobby chat'
    });

    socket.broadcast.to('lobby').emit('receiveMessage', {
      username: 'SERVER',
      message: `${username} has connected to this room`
    });

    // socket.emit.to(socket.room).emit('updateRoomUsers', usernames);
    // io.emit('updateRoomUsers', usernames);
    io.sockets.in(socket.room).emit('updateRoomUsers', rooms[socket.room].roomUsers);
  });

  // socket.on('sendToppingsUpdate', function(toppings) {
  //   io.sockets.emit('receiveToppingsUpdate', toppings);
  // });

  socket.on('sendMessage', function(message) {
    io.sockets.in(socket.room).emit('receiveMessage', message);
  });

  socket.on('typing', function(user) {
    socket.broadcast.to(socket.room).emit('typing', user);
  });

  socket.on('clearTyping', function() {
    socket.broadcast.to(socket.room).emit('clearTyping');
  });

  socket.on('inviteUser', function(userSendingInvite, socketIDofUserAcceptingInvite) {
    // console.log(userSendingInvite);
    if (io.sockets.connected[socketIDofUserAcceptingInvite]) {
      io.sockets.connected[socketIDofUserAcceptingInvite].emit('receiveRoomInvite', userSendingInvite, socket.id);
    }
  });

  socket.on('acceptInvite', function(userAccepting, sockedIDofUserSendingInvite, newRoom) {
    // console.log('GETTING DECLINED: ', userDeclining, sockedIDofUserSendingInvite);
    if (io.sockets.connected[sockedIDofUserSendingInvite]) {
      io.sockets.connected[sockedIDofUserSendingInvite].emit('inviteAccepted', userAccepting, newRoom);
    }
  });

  socket.on('declineInvite', function(userDeclining, sockedIDofUserSendingInvite) {
    // console.log('GETTING DECLINED: ', userDeclining, sockedIDofUserSendingInvite);
    if (io.sockets.connected[sockedIDofUserSendingInvite]) {
      io.sockets.connected[sockedIDofUserSendingInvite].emit('inviteDeclined', userDeclining);
    }
  });

  socket.on('initiateSizeChange', function(size) {
    // console.log('new size is ', size, 'chosen by ', socket.username);
    if (socket.room !== 'lobby') {
      io.sockets.in(socket.room).emit('updateSize', size);
    }
  });

  socket.on('initializeCrustChange', function(crust) {
    if (socket.room !== 'lobby') {
      io.sockets.in(socket.room).emit('updateCrust', crust);
    }
  });

  socket.on('changeToppings', function(toppings) {
    if (socket.room !== 'lobby') {
      socket.broadcast.to(socket.room).emit('friendChangedToppings', toppings, socket.username);
    }
  });

  socket.on('setStep', function(step) {
    if (socket.room !== 'lobby') {
      io.sockets.in(socket.room).emit('changeStep', step);
    }
  });

  socket.on('submittedOrder', function(userSubmitting) {
    // console.log('friend submitted order');
    if (socket.room !== 'lobby') {
      io.sockets.in(socket.room).emit('friendSubmittedOrder', userSubmitting);
      socket.broadcast.to(socket.room).emit('receiveMessage', {
        username: 'SERVER',
        message: `${socket.username} has submitted this order`
      });
    } else {
      socket.broadcast.to(socket.room).emit('receiveMessage', {
        username: 'SERVER',
        message: `${socket.username} has submitted a pizza order alone!`
      });
    }
  });

  socket.on('switchRoom', function(newRoom) {
    // console.log('User switching in', socket.username);
    socket.leave(socket.room);
    //check if new rooms already exists
    //if not, create it and add the creating user to its
    //roomUsers list
    if (rooms[newRoom] === undefined) {
      rooms[newRoom] = {
        roomName: newRoom,
        roomUsers: {
          [socket.username]: [socket.username, socket.id]
        }
      };
      //IF IT EXISTS, simply add the curret user to its roomUsers
      // list
    } else {
      rooms[newRoom].roomUsers[socket.username] = [socket.username, socket.id];
    }

    // delete the current user from the active users of a room which
    // this user just left and have them update their userlist
    if (rooms[socket.room]) {
      delete rooms[socket.room].roomUsers[socket.username];
    }

    io.sockets.in(socket.room).emit('updateRoomUsers', rooms[socket.room].roomUsers);

    socket.join(newRoom);
    socket.emit('clearMessages');
    socket.emit('receiveMessage', {
      username: 'SERVER',
      message: `you have connected to a new room`
    });
    // this actually emits a "goodbye" to the old room BEFORE reassigning new room
    socket.broadcast.to(socket.room).emit('receiveMessage', {
      username: 'SERVER',
      message: `${socket.username} has left this room`
    });

    //NOW reassign room:
    socket.room = newRoom;

    socket.broadcast.to(newRoom).emit('receiveMessage', {
      username: 'SERVER',
      message: `${socket.username} has joined this room`
    });

    io.sockets.in(socket.room).emit('updateRoomUsers', rooms[socket.room].roomUsers);
  });

  socket.on('disconnect', function() {
    delete usernames[socket.username];
    if (rooms[socket.room]) {
      delete rooms[socket.room].roomUsers[socket.username];
      io.sockets.in(socket.room).emit('updateRoomUsers', rooms[socket.room].roomUsers)
    }
    socket.broadcast.to(socket.room).emit('receiveMessage', {
      username: 'SERVER',
      message: `${socket.username} has disconnected`
    });
    socket.leave(socket.room);
  });
});


app.get('/sizes', function (req, res) {
  db.getAllSizes(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/toppings', function (req, res) {
  // console.log('SERVER SIDE: asking for toppings');
  db.getAllToppings(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/crusts', function (req, res) {
  db.getAllCrusts(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/save', function (req, res) {
  db.savePizza(req.body, function(err, data) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var pizzaId = data.insertId;
      db.saveToppings(pizzaId, req.body, function(err, data) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          db.getPizza(pizzaId, function(err, data) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.status(200);
              res.json(data);
            }
          })
        }
      })
    }
  });
});

app.get('/users/:username/:password', function (req, res) {
  var username = req.params.username;
  var password = req.params.password;
  db.verifyUser(username, password, function(err, data, id) {
    if(err) {
      res.json(500);
    } else {
      if (data) {
        res.json(id);
      } else {
        res.json(data);
      }
    }
  });
});

app.post('/users/:username', function (req, res) {
  var username = req.params.username;
  db.saveUser(username, req.body.password, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

module.exports = server;
