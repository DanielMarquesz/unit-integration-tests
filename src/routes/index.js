const router = require('express').Router()
const controller = require('../controller/employee')
const verifyToken = require('../utils/verify')

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

router.delete('/employee/:_id', verifyToken, controller.deleteEmployeeById)

router.post('/employee/login', controller.loginEmployee)

module.exports = { 
  router
}