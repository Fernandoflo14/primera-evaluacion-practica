const employeeService = require('../services/employee.service');

async function getEmployees(req, res) {
  try {
    const { search } = req.query;

    const employees = await employeeService.getEmployees(search);

    return res.status(200).json({
      success: true,
      message: 'Empleados obtenidos correctamente',
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los empleados',
    });
  }
}

module.exports = {
  getEmployees,
};