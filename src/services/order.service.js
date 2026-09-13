const pool = require('../config/database');

async function getOrderById(orderId) {
  const orderQuery = `
    SELECT
      o.order_id,
      o.customer_id,
      c.company_name AS customer_name,
      o.employee_id,
      e.first_name,
      e.last_name,
      o.order_date,
      o.required_date,
      o.shipped_date,
      o.ship_via,
      o.freight,
      o.ship_name,
      o.ship_address,
      o.ship_city,
      o.ship_region,
      o.ship_postal_code,
      o.ship_country
    FROM orders o
    JOIN customers c
      ON c.customer_id = o.customer_id
    JOIN employees e
      ON e.employee_id = o.employee_id
    WHERE o.order_id = $1
  `;

  const orderResult = await pool.query(orderQuery, [orderId]);

  if (orderResult.rows.length === 0) {
    return null;
  }

  const detailsQuery = `
    SELECT
      od.product_id,
      p.product_name,
      od.unit_price,
      od.quantity,
      od.discount,
      ROUND(
        (
          od.unit_price::numeric *
          od.quantity::numeric *
          (1 - od.discount::numeric)
        ),
        2
      ) AS line_total
    FROM order_details od
    JOIN products p
      ON p.product_id = od.product_id
    WHERE od.order_id = $1
    ORDER BY od.product_id
  `;

  const detailsResult = await pool.query(detailsQuery, [orderId]);

  return {
    ...orderResult.rows[0],
    details: detailsResult.rows,
  };
}

module.exports = {
  getOrderById,
};