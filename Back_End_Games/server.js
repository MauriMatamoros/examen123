var hapi = require('hapi');
var mongoose = require('mongoose');
var authenticate = require('hapi-auth-cookie');
var routes = require('./routes.js');
var inert = require('inert');


var servidor = new hapi.Server();
servidor.connection({
  port: ~~process.env.PORT || 8000,
  routes: {
    cors: {
      credentials: true,
      origin:["*"]
    }
  }
});

mongoose.connect('mongodb://localhost:27017/coca');

var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'Error de conexion'));
dataBase.once('open', function callback(){
  console.log('Conexion con base de datos establecida.');
});

servidor.register([inert, authenticate], function(err){
  servidor.auth.strategy('session', 'cookie',{
    password: 'noseporqueestacosatienequesertanlarga',
    cookie: 'BackEnd_Mauri_Games',
    ttl:24 * 60 * 60 * 1000,
    isSecure: false
  });

  servidor.route(routes.endpoints);

  servidor.start(function(){
    console.log('Servidor encendido, corriendo en puerto: ', servidor.info.uri);
  });
});
