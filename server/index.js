var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function (req, res) {
  var infinite = {};

  items.getAllTopings(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      infinite['topings'] = data;
    }
  });

  items.getAllSizes(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      infinite['sizes'] = data;
    }
  });

  items.getAllCrusts(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      infinite['crusts'] = data;
    }
  });


});


app.post('/save', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json('ROFL JSON RESPONSE');
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
