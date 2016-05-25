var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var gameSchema = new mongoose.Schema({
  name: String,
  company: String,
  link: String
});

gameSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Game', gameSchema);
