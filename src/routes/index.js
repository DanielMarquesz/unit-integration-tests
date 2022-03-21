const router = require('express').Router()
const employee = require('../controller/employee')

router.get('/', (req, res) => {
  res.json({
    status: 'API is Working',
    message: 'Welcome to the employee api router'
  })
})

router.post('/employee', employee.createEmployee)

router.get('/employee', employee.getAllEmployees)

router.get('/employee/:_id', employee.getEmployee)

module.exports = { 
  router
}