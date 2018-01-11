var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var items = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

function getSizes() {
  return axios.get('/sizes');
};

function getTopings() {
  return axios.get('/topings');
};

function getCrusts() {
  return axios.get('/crusts');
};

app.get('/items', function(req, res) {
  return axios.all([getTopings(), getCrusts(), getSizes()])
    .then(function(arr) {
      return {
        topings: arr[0].data,
        crusts: arr[1].data,
        sizes: arr[2].data
      }
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

app.get('/topings', function (req, res) {
  items.getAllTopings(function(err, data) {
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
