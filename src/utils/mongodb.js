require('dotenv').config()
const mongoose = require('mongoose')

const connect = async () => {
  try {
    await mongoose.connect(process.env.URL)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const disconnect = async () => {
  try {
    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const dropCollection = async (collectionName) => {
  try {
    await mongoose.connection.collection(collectionName).drop()
  } catch (error) {

    if(error.code === 26){
      console.log('Namescape %s not found', collectionName)
    }

    console.log(error)
    throw new Error(error)
  }
}

module.exports = {
  connect,
  disconnect,
  dropCollection
}