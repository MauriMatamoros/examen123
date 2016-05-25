var product = require('../Schema/product');

exports.createProduct = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin', 'Regular']
  },
  handler: function(request, reply){
    var newProduct = new product({
      name: request.payload.name,
      description: request.payload.description,
      ingredients: request.payload.ingredients
    });

    newProduct.save(function(err){
      if(!err){
        console.log('New Product')
        console.log('The product was replied');
        return reply('Product saved.');
      }else{
        console.log('An error was found');
        return reply('Error');
      }
    });
  }
};

exports.getProducts = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var productGot = product.find({});
    console.log('Replying all products');
    reply(productGot);
  }
};

exports.getProductsByID = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var productGot = product.find({_id: request.params._id}, function(err, product){
      if(!err){
       console.log('The product was found');
       return reply(productGot);
      }
      console.log('The product was not Found');
      return reply('Product not Found');
    });
  }
};

exports.deleteProduct = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var productDeleted = product.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting product');
        productDeleted.remove().exec();
        console.log('Product was deleted');
        return reply('Product Deleted')
      }else{
        console.log('Product not Found')
        return reply('Product was not Found');
      }
    });
  }
};

exports.updateProduct = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin']
  },
  handler: function(request, reply){
    var getProduct = product.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      name: request.payload.name,
      description: request.payload.description,
      ingredients: request.payload.ingredients
    }, function(err){
      if(err){
        console.log('Error... ' + err);
        reply('Error');
      }else{
        console.log('Product con ID: ' + request.payload._id + ' Ha sido modificado');
        reply('Product Modificado');
      }
    });
  }
};
