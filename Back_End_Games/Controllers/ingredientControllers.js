var ingredient = require('../Schema/ingredient');

exports.createIngredient = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var newIngredient = new ingredient({
      name: request.payload.name,
      description: request.payload.description
    });

    newIngredient.save(function(err){
      if(!err){
        console.log('New ingredient')
        console.log('The ingredient was replied');
        return reply('ingredient saved.');
      }else{
        console.log('An error was found');
        return reply('Error');
      }
    });
  }
};

exports.getIngredients = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var ingredientGot = ingredient.find({});
    console.log('Replying all ingredients');
    reply(ingredientGot);
  }
};

exports.getIngredientsByID = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var ingredientGot = ingredient.find({_id: request.params._id}, function(err, ingredient){
      if(!err){
       console.log('The ingredient was found');
       return reply(ingredientGot);
      }
      console.log('The ingredient was not Found');
      return reply('ingredient not Found');
    });
  }
};

exports.deleteIngredient = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var ingredientDeleted = ingredient.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting ingredient');
        ingredientDeleted.remove().exec();
        console.log('Ingredient was deleted');
        return reply('Ingredient Deleted')
      }else{
        console.log('Ingredient not Found')
        return reply('Ingredient was not Found');
      }
    });
  }
};

exports.updateIngredient = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var getIngredient = ingredient.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      name: request.payload.name,
      description: request.payload.description
    }, function(err){
      if(err){
        console.log('Error... ' + err);
        reply('Error');
      }else{
        console.log('Ingredient con ID: ' + request.payload._id + ' Ha sido modificado');
        reply('Ingredient Modificado');
      }
    });
  }
};
