const express = require('express')
const { router } = require('./routes')
const mongodb = require('./utils/mongodb')
const app = express()

app.use(express.json())

app.use('/api',router)

mongodb.connect()

app.listen(3000, () => {
  console.log('Running on Port 3000')
})