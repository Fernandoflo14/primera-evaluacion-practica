const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.post('/validate', orderController.validateOrder);
router.get('/:id', orderController.getOrderById);

module.exports = router;