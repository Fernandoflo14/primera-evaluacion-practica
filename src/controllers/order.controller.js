const orderService = require('../services/order.service');

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

module.exports = {
  getOrderById,
};