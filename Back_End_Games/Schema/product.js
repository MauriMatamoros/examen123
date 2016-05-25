var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var productSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: String
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
