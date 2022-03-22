const employeemodel = require('../model/employee')
const joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

const schemaLogin = joi.object({
  email: joi
    .string()
    .required()
    .email(),
  password: joi
    .string()
    .min(6)
    .max(12)
    .required()
})

exports.createEmployee = async (req, res, next) => {
  try {

    const valid = schema.validate(req.body)

    if(valid.error || valid.errors){
      res.status(400).json(valid)
    }

    const emailExists = await employeemodel.findOne({
      email: req.body.email
    })

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

exports.getEmployeeById = async (req, res, next) => {
  try {

    const employee = await employeemodel.findById(req.params._id)

    if(!employee){
      res.status(404).json(
        {
          message: "Employee not found"
        }
      ).send()
      return
    }
    
    res.status(200).json(employee)
  } catch (error) {
    res. status(500).send(error)
  }
}

exports.updateEmployeeById = async (req, res, next) => {
  try {

    const employee = await employeemodel.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        useFindAndModify: false
      }
    )

    if(!employee){
      res.status(404).json('Id not found')
    }

    res.status(201).json(employee)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteEmployeeById = async (req, res, next) => {
  try {

    const employee = await employeemodel.findByIdAndDelete(
      req.params._id      
    )

    if(!employee){
      res.status(404).json('Id not found')
    }

    res.send().status(200)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.loginEmployee = async (req, res, next) => {
  try {

    const valid = schemaLogin.validate(req.body)

    if(valid.error || valid.errors){
      res.status(400).json(valid)
    }

    const employee = await employeemodel.findOne({
      email: req.body.email
    })

    if(!employee) {
      res.status(400).json(
        'Login failed'
      )
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      employee.password
      )

    if(!validatePassword) {
      return res.status(400).send('Login failed')
    }

    const jwtToken = jwt.sign({
      data: employee
    }, process.env.SECRET, { expiresIn: '1h' })
    
    res.header('auth-token', jwtToken)
    res.status(201).json(employee)

  } catch (error) {
    console.log(error)
    res.status(500).json(err)
  }
}