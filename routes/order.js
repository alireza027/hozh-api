// add dependencies
const router = require('express').Router();


// add controllers
const OrderController = require('../controllers/OrderController');


// order get one GET method
router.get('/:id', OrderController.FetchOrder);


// order get one GET method
router.get('/fetch-all-orders', OrderController.FetchAllOrders);


// order paginate GET method
router.get('/fetch-paginate-order', OrderController.FetchAllAndPaginateOrders);


// update order add PUT method
router.put('/update-order-add', OrderController.AddOrders);


// update order delete PUT method
router.put('/update-order-delete', OrderController.DeleteOrder);


// export this module as router
module.exports = router;