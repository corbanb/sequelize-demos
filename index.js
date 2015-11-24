var express = require('express');
var app = express();
var server;

var db = require('./models');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/welcome', function (req, res) {
  res.send('Welcome!');
});

app.get('/user', function(req, res){

    var newUser = {
        email: req.query.email,
        username: req.query.username
    };

    db.User.create(newUser).then(function(createdUser){
        res.json(createdUser);
    }).catch(function(e){
        res.json(e);
    })
});

app.get('/users', function(req, res){
    db.User.findAll({}).then(function(results){
        res.json(results);
    }).catch(function(e){
        res.json(e);
    })
});

db.sequelize.sync(db.options).then(function(){
    var port = process.env.PORT || 3000;
    server = app.listen(port, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });
}).catch(function(e) {
    throw new Error(e);
});
