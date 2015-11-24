var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var db = {};
var options = {
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false,
    sync: {
        force: true,
    },
    ssl: true
};

var uri = process.env.DATABASE_URL || 'postgres://localhost/sequelize-demos';

var sequelize = new Sequelize(uri, options);

fs.readdirSync(__dirname).filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function(file) {
  var model = sequelize['import'](path.join(__dirname, file)); // import each model
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
