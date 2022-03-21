const employeemodel = require('../model/employee')
const joi = require('@hapi/joi')
const bcrypt = require('bcrypt')


const schema = joi.object({
  name: joi
    .string()
    .required(),
  email: joi
    .string()
    .required()
    .email(),
  password: joi
    .string()
    .min(6)
    .max(12)
    .required(),
  gender: joi
    .string(),
  phone: joi
    .string()
})

exports.createEmployee = async (req, res, next) => {
  try {

    const valid = schema.validate(req.body)

    if(valid.error || valid.errors){
      res.status(400).json(valid)
    }

    const emailExists = await(employeemodel.findOne({
      email: req.body.email
    }))

    if(emailExists) {
      res.status(400).json(
        'Invalid Email'
      )
    }

    const salt = await bcrypt.genSalt(10)
    const encryptPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = encryptPassword
    const employee = await(employeemodel.create(req.body))
    
    res.status(201).json({
      employee
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeemodel.find()

    if(!employees){
      res.status(404).json('No employees found')
    }

    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getEmployee = async (req, res, next) => {
  try {

    const employee = await employeemodel.findById(req.params._id)

    if(!employee){
      res.status(404).json('Id not found')
    }

    res.status(200).json(employee)
  } catch (error) {
    res.status(500).json(error)
  }
}