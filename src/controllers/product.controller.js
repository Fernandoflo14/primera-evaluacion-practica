const productService = require('../services/product.service');

async function getProducts(req, res) {
  try {
    const { search, available } = req.query;

    const products = await productService.getProducts(
      search,
      available
    );

    return res.status(200).json({
      success: true,
      message: 'Productos obtenidos correctamente',
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
    });
  }
}

module.exports = {
  getProducts,
};