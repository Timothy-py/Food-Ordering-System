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
    'GET /logout' : 'UserController.logout',
    'GET /all-orders' : 'OrderController.viewAllOrders',
    'GET /my-orders' : 'OrderController.viewMyOrders',
    'POST /order' : 'OrderController.createOrder',
    'PATCH /update' : 'OrderController.updateOrderStatus'
};
