const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const customerRoutes = require('./routes/customer.routes');
const employeeRoutes = require('./routes/employee.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Northwind API funcionando correctamente',
  });
});

app.use('/customers', customerRoutes);
app.use('/employees', employeeRoutes);
app.use('/products', productRoutes);

module.exports = app;