const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    status: 'API is Working',
    message: 'Welcome to the employee api router'
  })
})

router.get('/', (req, res) => {
  res.json({
    status: 'API is Working',
    message: 'Welcome to the employee api router'
  })
})

module.exports = { 
  router
}