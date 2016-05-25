var gamesController = require('./Controllers/gameControllers');
var ingredientsController = require('./Controllers/ingredientControllers');
var productsController = require('./Controllers/productControllers');
var usersController = require('./Controllers/usersController');
var authenticate = require('./Controllers/authController');

exports.endpoints = [{method:'POST', path:'/addProduct', config: productsController.createProduct},
{method:'GET', path:'/getProducts', config: productsController.getProducts},
{method:'GET', path:'/searchProduct/{_id}', config: productsController.getProductsByID},
{method:'DELETE', path:'/deleteProduct/{_id}', config:productsController.deleteProduct},
{method: 'PUT', path: '/updateProduct/{_id}', config: productsController.updateProduct},
{method:'GET', path:'/getIngredients', config: ingredientsController.getIngredients},
{method:'POST', path:'/addIngredient', config: ingredientsController.createIngredient},
{method:'GET', path:'/searchIngredient/{_id}', config: ingredientsController.getIngredientsByID},
{method:'DELETE', path:'/deleteIngredient/{_id}', config:ingredientsController.deleteIngredient},
{method: 'PUT', path: '/updateIngredient/{_id}', config: ingredientsController.updateIngredient},
{method: 'POST', path: '/register', config: usersController.CreateUser},
{method: 'POST', path: '/login', config: authenticate.login},
{method: 'GET', path: '/logout', config: authenticate.logout},
{method: 'GET', path: '/v1/getUsers', config: usersController.getUsers}
];
