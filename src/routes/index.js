const router = require('express').Router()
const controller = require('../controller/employee')

router.get('/', (req, res) => {
  res.json({
    status: 'API is Working',
    message: 'Welcome to the employee api router'
  })
})

router.post('/employee', controller.createEmployee)

router.get('/employee', controller.getAllEmployees)

router.get('/employee/:_id', controller.getEmployeeById)

router.put('/employee/:_id', controller.updateEmployeeById)

router.delete('/employee/:_id', controller.deleteEmployeeById)

router.post('/employee/login', controller.loginEmployee)

module.exports = { 
  router
}