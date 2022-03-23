const controller = require('../../../src/controller/employee')
const model = require('../../../src/model/employee')
const httpMock = require('node-mocks-http')
const mockEmployeeList = require('../../mock-data/employees.json')

model.find = jest.fn()
let req, res, next

describe('controller.getAllEmployees', () => {
  beforeEach(() => {
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = null
  })

  afterEach(() => {
    model.find.mockClear()
  })
  
  it('Should verify if getAllEmployees function is defined', () => {
    expect(typeof controller.getAllEmployees).toBe('function')
  })

  it('Should get all employees without errors', async() => {
    model.find.mockResolvedValue(mockEmployeeList)

    await controller.getAllEmployees(req, res, next)
    expect(model.find).toBeCalledTimes(1)
    expect(model.find).toBeCalledWith()

    expect(res.statusCode).toBe(200)
    expect(res._getData()).toStrictEqual(JSON.stringify(mockEmployeeList))
  })

  it('Should return 404 when no employees found', async() => {
    model.find.mockResolvedValue([])

    await controller.getAllEmployees(req, res, next)
    expect(model.find).toBeCalledTimes(1)
    expect(model.find).toBeCalledWith()

    expect(res.statusCode).toBe(404)
    expect(res._getData()).toStrictEqual("{\"message\":\"No employees found\"}")
  })

  it('Should return 500 when catch block', async() => {
    model.find.mockRejectedValue()

    await controller.getAllEmployees(req, res, next)
    expect(model.find).toBeCalledTimes(1)
    expect(model.find).toBeCalledWith()

    expect(res.statusCode).toBe(500)    
  })
})
