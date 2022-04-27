const controllers = require('../controllers/orderdetails.controller');
const express = require('express');

const orderDetailsRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
orderDetailsRoutes.get('/', controllers.getAllOrderDetails).post('/', controllers.createOrderDetails);

/**
 * Routes for orderdetails by orderNumber. Evalutes to `/orderdetails/:orderNumber`.
 */
orderDetailsRoutes
  .get('/:orderNumber', controllers.getOrderDetails) // GET http://locahost:3000/orderdetails/1
  .put('/:orderNumber', controllers.updateOrderDetails)
  .delete('/:orderNumber', controllers.deleteOrderDetails);

module.exports = orderDetailsRoutes;