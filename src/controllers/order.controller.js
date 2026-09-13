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
async function validateOrder(req, res) {
  try {
    const errors = orderValidationService.validateOrderBody(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos de la orden inválidos',
        errors,
      });
    }

    const {
      customer_id,
      employee_id,
      products,
    } = req.body;

    const validation =
      await orderValidationService.validateOrderReferences(
        customer_id.trim(),
        Number(employee_id),
        products
      );

    if (!validation.valid) {
      return res.status(validation.status).json({
        success: false,
        message: validation.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'La orden es válida y puede ser registrada',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al validar la orden',
    });
  }
}
module.exports = {
  getOrderById,
  validateOrder,
};