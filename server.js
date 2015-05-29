var express = require('express');
var app = express();
var server = require('http').Server(app);
var Sheetly = require('./lib/sheetly.js');


app.use(express.static('public'));

server.listen(3000, function(){
  console.log("Server started on port 3000");
});


var input =
  {
  'body': {
    'background-color': 'black',
    'color': 'white'
  },
    'div a': {
      'background-color': 'red',
      'color': 'green'
    }
  };

var options = {};

var sheetly = new Sheetly(input, options);
sheetly.add('body', {'left': '100px'});
console.log(sheetly.sheetly);
console.log(sheetly.sheetstring);


sheetly.add('div a', {'left': '100px'});
sheetly.add('div a', {'left': '100px'});
sheetly.add('div a', {'left': '100px'});
sheetly.add('div a', {'left': '100px'});
sheetly.add('div a', {'left': '100px'});
sheetly.add('div a', {'left': '100px'});
sheetly.add('div a', {'left': '100px'});
console.log(sheetly.sheetly);
console.log(sheetly.sheetstring);
