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


var usernames = {};
var rooms =['lobby'];

io.on('connection', function(socket) {
  console.log('made socket connection ', socket.id);

  socket.on('addUser', function(username) {
    socket.username = username;
    socket.room = 'lobby';
    usernames[username] = username;
    // if (!socket.usersInRoom) {
    //   socket.usersInRoom = {};
    // } else {
    //   socket.usersInRoom[username] = username;
    // }
    // console.log(socket.usersInRoom);
    // socket.room.users[username]

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
    io.emit('updateRoomUsers', usernames);

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

  socket.on('switchRoom', function(newRoom) {
    socket.leave(socket.room);
    if (rooms.indexOf(newRoom) < 0) {
      rooms.push(newRoom);
    }
    socket.join(newRoom);
    socket.emit('receiveMessage', {
      username: 'SERVER',
      message: `you have connected to room ${newRoom}`
    });
    // this actually emits a "goodbye" to the old room BEFORE reassigning new room
    socket.broadcast.to(socket.room).emit('receiveMessage', {
      username: 'SERVER',
      message: `${socket.username} has left this room`
    });
    //below logic deletes the user who switched rooms out of lobby
    //from the main usernames{} container - so it is no longer
    //valid, and them emits the udpateRoomUsers event to ensure
    //all other lobby-connected clients have the latest information
    // delete usernames[socket.username];
    // io.emit('updateRoomUsers', usernames);

    //NOW reassign room:
    socket.room = newRoom;
    // below logic creates a usernames object FOR THAT ROOM ONLY
    // socket.room.usernames = {};
    // socket.room.usernames[socket.username] = socket.username;

    socket.broadcast.to(newRoom).emit('receiveMessage', {
      username: 'SERVER',
      message: `${socket.username} has joined this room`
    });
  });

  socket.on('disconnect', function() {
    delete usernames[socket.username];
    io.emit('updateRoomUsers', usernames);
    socket.broadcast.emit('receiveMessage', {
      username: 'SERVER',
      message: `${socket.username} has disconnected`
    });
    socket.leave(socket.room);
  });
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
