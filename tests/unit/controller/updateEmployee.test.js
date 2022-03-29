const controller = require('../../../src/controller/employee')
const model = require('../../../src/model/employee')
const httpMock = require('node-mocks-http')
const mockEmployee = require('../../mock-data/employees.json')

model.findByIdAndUpdate = jest.fn()
let req, res, next

describe('controller.updateEmployeeById', () => {
  beforeEach(() => {
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = null
  })

  afterEach(() => {
    model.findByIdAndUpdate.mockClear()
  })
  
  it('Should verify if updateEmployee function is defined', () => {
    expect(typeof controller.updateEmployeeById).toBe('function')
  })

  it('Should update an existing employee', async () => {
    let dataToUpdate = {...mockEmployee[0], phone:"0878667"}
    model.findByIdAndUpdate.mockResolvedValue(dataToUpdate)
    req.params._id = mockEmployee[0]._id
    req.body = {...dataToUpdate}

    await controller.updateEmployeeById(req, res, next)

    expect(model.findByIdAndUpdate).toBeCalledTimes(1)
    expect(model.findByIdAndUpdate).toBeCalledWith(
      req.params._id,
      req.body,
        {
          useFindAndModify: false
        }
      )
    expect(res.statusCode).toStrictEqual(201)
    expect(res._getData()).toStrictEqual(JSON.stringify(req.body))
  })

  it('Should return status code 404 when not found the employee', async () => {
    let dataToUpdate = {...mockEmployee[0], phone:"0878667"}
    model.findByIdAndUpdate.mockResolvedValue(undefined)
    req.params._id = mockEmployee[0]._id
    req.body = {...dataToUpdate}

    await controller.updateEmployeeById(req, res, next)

    expect(model.findByIdAndUpdate).toBeCalledTimes(1)
    expect(model.findByIdAndUpdate).toBeCalledWith(
      req.params._id,
      req.body,
        {
          useFindAndModify: false
        }
      )
    expect(res.statusCode).toStrictEqual(404)
    expect(res._getData()).toStrictEqual("{\"message\":\"Id not found\"}")
  })
})
