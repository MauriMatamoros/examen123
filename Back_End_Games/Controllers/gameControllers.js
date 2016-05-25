var game = require('../Schema/game');

exports.createGame = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin', 'Rokr']
  },
  handler: function(request, reply){
    var newGame = new game({      
      name: request.payload.name,
      company: request.payload.company,
      link: request.payload.link
    });

    newGame.save(function(err){
      if(!err){
        console.log('Nuevo jeugo creado en DB')
        console.log('The games was replied');
        return reply('Juego guardado.');        
      }else{
        console.log('An error was found');
        return reply('Error');
      }      
    });        
  }
};

exports.getGames = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin', 'Regular', 'Rokr']
  },
  handler: function(request, reply){
    var gameGoted = game.find({});
    console.log('Replying all games');
    reply(gameGoted);
  }
};

exports.getGamesByID = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin', 'Rokr', 'Regular']
  },
  handler: function(request, reply){
    var gameGoted = game.find({_id: request.params._id}, function(err, game){
      if(!err){
       console.log('The game was founded');
       return reply(gameGoted);
      }      
      console.log('The games was not Found');
      return reply('Game not Found');
    });    
  }
};

exports.deleteGame = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Rokr']
  },
  handler: function(request, reply){
    var gameDeleted = game.find({_id: request.params._id}, function(err){
      if(!err){
        console.log('Deleting game');
        gameDeleted.remove().exec();
        console.log('Game was deleted');
        return reply('Game Deleted')
      }else{
        console.log('Game not Found')
        return reply('Game was not Found');
      }
    });    
  }
};

exports.updateGame = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['Admin', 'Rokr']
  },
  handler: function(request, reply){
    var getGame = game.findByIdAndUpdate(encodeURIComponent(request.params._id), {
      name: request.payload.name,
      company: request.payload.company,
      link: request.payload.link
    }, function(err){
      if(err){
        console.log('Error... ' + err);
        reply('Error');
      }else{
        console.log('Juego con ID: ' + request.payload._id + ' Ha sido modificado');
        reply('Juego Modificado');
      }
    });
  }
};
