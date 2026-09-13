const pool = require('../config/database');

function validateOrderBody(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    errors.push('El cuerpo de la solicitud es obligatorio');
    return errors;
  }

  if (
    typeof body.customer_id !== 'string' ||
    body.customer_id.trim().length === 0
  ) {
    errors.push('customer_id es obligatorio');
  }

  if (
    !Number.isInteger(Number(body.employee_id)) ||
    Number(body.employee_id) <= 0
  ) {
    errors.push('employee_id debe ser un número válido');
  }

  if (!body.order_date) {
    errors.push('order_date es obligatorio');
  }

  if (!Array.isArray(body.products) || body.products.length === 0) {
    errors.push('La orden debe contener al menos un producto');
  } else {
    body.products.forEach((item, index) => {
      if (
        !Number.isInteger(Number(item.product_id)) ||
        Number(item.product_id) <= 0
      ) {
        errors.push(
          `products[${index}].product_id debe ser válido`
        );
      }

      if (
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
      ) {
        errors.push(
          `products[${index}].quantity debe ser mayor a cero`
        );
      }

      if (
        item.discount !== undefined &&
        (
          Number.isNaN(Number(item.discount)) ||
          Number(item.discount) < 0 ||
          Number(item.discount) > 1
        )
      ) {
        errors.push(
          `products[${index}].discount debe estar entre 0 y 1`
        );
      }
    });
  }

  return errors;
}

async function validateOrderReferences(customerId, employeeId, products) {
  const customerResult = await pool.query(
    `
      SELECT customer_id
      FROM customers
      WHERE customer_id = $1
    `,
    [customerId]
  );

  if (customerResult.rows.length === 0) {
    return {
      valid: false,
      status: 404,
      message: 'Cliente no encontrado',
    };
  }

  const employeeResult = await pool.query(
    `
      SELECT employee_id
      FROM employees
      WHERE employee_id = $1
    `,
    [employeeId]
  );

  if (employeeResult.rows.length === 0) {
    return {
      valid: false,
      status: 404,
      message: 'Empleado no encontrado',
    };
  }

  const productIds = [...new Set(
    products.map((item) => Number(item.product_id))
  )];

  const productsResult = await pool.query(
    `
      SELECT
        product_id,
        product_name,
        unit_price,
        units_in_stock,
        discontinued
      FROM products
      WHERE product_id = ANY($1::smallint[])
    `,
    [productIds]
  );

  if (productsResult.rows.length !== productIds.length) {
    const foundIds = productsResult.rows.map(
      (product) => Number(product.product_id)
    );

    const missingIds = productIds.filter(
      (id) => !foundIds.includes(id)
    );

    return {
      valid: false,
      status: 404,
      message: `Producto(s) no encontrado(s): ${missingIds.join(', ')}`,
    };
  }

  for (const item of products) {
    const product = productsResult.rows.find(
      (row) => Number(row.product_id) === Number(item.product_id)
    );

    if (Number(product.discontinued) !== 0) {
      return {
        valid: false,
        status: 400,
        message: `El producto ${product.product_id} está descontinuado`,
      };
    }

    if (Number(product.units_in_stock) < Number(item.quantity)) {
      return {
        valid: false,
        status: 400,
        message: `Stock insuficiente para el producto ${product.product_id}`,
      };
    }
  }

  return {
    valid: true,
    products: productsResult.rows,
  };
}

module.exports = {
  validateOrderBody,
  validateOrderReferences,
};