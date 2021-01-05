/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'POST /signup' : 'UserController.signUp',
    'POST /login' : 'UserController.login',
    'GET /all-orders' : 'OrderController.viewAllOrders',
    'POST /order' : 'OrderController.createOrder',
    'PUT /update/:id' : 'OrderController.updateOrderStatus'
};
