const controller = require('../../../src/controller/employee')
const model = require('../../../src/model/employee')
const httpMock = require('node-mocks-http')
const mockData = require('../../mock-data/employeeLogin.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


model.findOne = jest.fn()
bcrypt.compare = jest.fn()
jwt.sign = jest.fn()
let req, res, next


describe('controller.loginEmployee', () => {
  beforeEach(() => {
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = null
  })

  afterEach(() => {
    model.findOne.mockClear()
    bcrypt.compare.mockClear()
  })
  
  it('Should verify if loginEmployee function is defined', () => {
    expect(typeof controller.loginEmployee).toBe('function')
  })

  it('Should login an employee and return an JWT', async () => {
    req.body = mockData
    model.findOne.mockResolvedValue(req.body.email)
    bcrypt.compare.mockReturnValue(true)
    jwt.sign.mockReturnValue('djasdjkasdkasd51@#')

    await controller.loginEmployee(req, res, next)

    expect(model.findOne).toHaveBeenCalledTimes(1)
    expect(model.findOne).toHaveBeenCalledWith({"email": "ro@gmail.com"})

    expect(bcrypt.compare).toHaveBeenCalledTimes(1)
    // I mock the compare to be true Xd
    expect(bcrypt.compare).toHaveBeenCalledWith('asdf123', undefined)

    expect(res.statusCode).toBe(201)
  })

})
