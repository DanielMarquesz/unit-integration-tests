const employeemodel = require('../model/employee')

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await(employeemodel.create(req.body))
    res.status(201).json({
      employee
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}