const controller = require('../../../src/controller/employee')
const model = require('../../../src/model/employee')
const bcrypt = require('bcrypt')
const httpMock = require('node-mocks-http')
const mockEmployee = require('../../mock-data/employeeReqPayload.json')

model.create = jest.fn()
model.findOne = jest.fn()
bcrypt.hash = jest.fn()
bcrypt.genSalt = jest.fn()

let req, res, next

describe("Controller - Create Employee", () => {
  beforeEach(() => {
    model.create.mockClear()
    model.findOne.mockClear()
    bcrypt.hash.mockClear()
    bcrypt.genSalt.mockClear()
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = null
    req.body = {...mockEmployee}
  })

  afterEach(() => {
    model.create.mockClear()
  })

  it('Should create a user without errors', async () => {
    model.create.mockResolvedValue(mockEmployee)
    model.findOne.mockResolvedValue(false)
    bcrypt.hash.mockReturnValue('some string')
    bcrypt.genSalt.mockReturnValue(10)

    await controller.createEmployee(req, res, next)

    expect(res.statusCode).toBe(201)
    expect(res._getJSONData()).toStrictEqual({
      "employee":{
         "email":"amybody@gmail.com",
         "name":"Any One",
         "password":"123456"
      }
   })
   expect(model.create).toHaveBeenCalledWith({...mockEmployee, password:"some string"})
  })

  it('Should try to create a user that already exists', async () => {
    model.create.mockResolvedValue(mockEmployee)
    model.findOne.mockResolvedValue(true)

    await controller.createEmployee(req, res, next)

    expect(res.statusCode).toBe(400)
  })


  it('Should fell in the catch block', async () => {
    model.findOne.mockRejectedValue()

    await controller.createEmployee(req, res, next)

    expect(res.statusCode).toBe(500)
    expect(res._getData()).toBe("")
  })
})