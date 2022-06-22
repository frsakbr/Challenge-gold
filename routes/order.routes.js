const router = require('express').Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.post('/', orderController.createOrder);


module.exports = router;
