var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var gameSchema = new mongoose.Schema({
  name: String,
  description: String
});

gameSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ingredient', gameSchema);
