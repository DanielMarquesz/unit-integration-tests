const controller = require('../../../src/controller/employee')
const model = require('../../../src/model/employee')
const httpMock = require('node-mocks-http')
const mockEmployee = require('../../mock-data/employees.json')

model.findByIdAndDelete = jest.fn()
let req, res, next

describe('controller.deleteEmployeeById', () => {
  beforeEach(() => {
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = null
  })

  afterEach(() => {
    model.findByIdAndDelete.mockClear()
  })
  
  it('Should verify if deleteEmployee function is defined', () => {
    expect(typeof controller.deleteEmployeeById).toBe('function')
  })

  it('Should delete an existing employee', async () => {
    model.findByIdAndDelete.mockResolvedValue(true)
    req.params._id = mockEmployee[0]._id

    await controller.deleteEmployeeById(req, res, next)

    expect(model.findByIdAndDelete).toBeCalledTimes(1)
    expect(model.findByIdAndDelete).toBeCalledWith(req.params._id)
    expect(res.statusCode).toStrictEqual(200)
  })

  it('Should return status code 404 when not found the employee', async () => {
    model.findByIdAndDelete.mockResolvedValue(undefined)
    req.params._id = mockEmployee[0]._id

    await controller.deleteEmployeeById(req, res, next)

    expect(model.findByIdAndDelete).toBeCalledTimes(1)
    expect(model.findByIdAndDelete).toBeCalledWith(req.params._id)
    expect(res.statusCode).toStrictEqual(404)
    expect(res._getData()).toStrictEqual("{\"message\":\"Id not found\"}")
  })

  it('Should return status code 500 when enter in the catch error block', async () => {
    model.findByIdAndDelete.mockRejectedValue("Internal Server Error")
    req.params._id = mockEmployee[0]._id

    await controller.deleteEmployeeById(req, res, next)

    expect(model.findByIdAndDelete).toBeCalledTimes(1)
    expect(model.findByIdAndDelete).toBeCalledWith(req.params._id)
    expect(res.statusCode).toStrictEqual(500)
    expect(res._getData()).toStrictEqual("\"Internal Server Error\"")
  })
})
