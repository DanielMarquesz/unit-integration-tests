const app = require('./src/index')
const mongodb = require('./src/utils/mongodb')

mongodb.connect()

app.listen(3000, () => {
  console.log('Running on Port 3000')
})

module.exports = app