const orderService = require('../services/order.service');
const orderValidationService = require(
  '../services/order-validation.service'
);

async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la orden debe ser un número válido',
      });
    }

    const order = await orderService.getOrderById(Number(id));

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Orden obtenida correctamente',
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la orden',
    });
  }
}

async function createOrder(req, res) {
  const errors = orderValidationService.validateOrderBody(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Datos de la orden inválidos',
      errors,
    });
  }

  try {
    const orderData = {
      customer_id: req.body.customer_id.trim(),
      employee_id: Number(req.body.employee_id),
      order_date: req.body.order_date,
      required_date: req.body.required_date || null,
      products: req.body.products.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
        discount:
          item.discount === undefined
            ? 0
            : Number(item.discount),
      })),
    };

    const orderId = await orderService.createOrder(orderData);

    const createdOrder =
      await orderService.getOrderById(orderId);

    return res.status(201).json({
      success: true,
      message: 'Orden creada correctamente',
      data: createdOrder,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? 'Error al crear la orden'
          : error.message,
    });
  }
}

module.exports = {
  getOrderById,
  createOrder,
};