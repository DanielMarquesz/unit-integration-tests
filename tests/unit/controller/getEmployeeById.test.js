const controller = require('../../../src/controller/employee')
const model = require('../../../src/model/employee')
const httpMock = require('node-mocks-http')
const mockData = require('../../mock-data/employees.json')

model.findById = jest.fn()
let req, res, next

describe('controller.getEmployeeById', () => {
  beforeEach(() => {
    req = httpMock.createRequest()
    res = httpMock.createResponse()
    next = null
  })

  afterEach(() => {
    model.findById.mockClear()
  })
  
  it('Should verify if getEmployeeById function is defined', () => {
    expect(typeof controller.getEmployeeById).toBe('function')
  })

  it('Should return an employee by id', async () => {
    req.params._id = mockData[0]._id
    model.findById.mockResolvedValue(mockData[0])

    await controller.getEmployeeById(req, res, next)

    expect(model.findById).toBeCalledTimes(1)
    expect(model.findById).toBeCalledWith(
      {
      "$oid": "6239005d2cba04dc94ea7f21"
      }
    )    
   expect(res.statusCode).toStrictEqual(200)
   expect(res._getJSONData()).toStrictEqual({
    "__v":0,
    "_id":{
       "$oid":"6239005d2cba04dc94ea7f21"
    },
    "created_at":{
       "$date":"2022-03-21T22:46:53.667Z"
    },
    "email":"ro@gmail.com",
    "name":"Robin woood"
    })
  })

  it('Should return 404 status when id not found', async () => {
    model.findById.mockResolvedValue(undefined)
    await controller.getEmployeeById(req, res, next)
    expect(res.statusCode).toBe(404)
  })

  it('Should return 500 when thorw an exception', async () => {
    req.params._id = mockData[0]._id
    model.findById.mockRejectedValue('Internal Server Error')
    await controller.getEmployeeById(req, res, next)
    expect(model.findById).toHaveBeenCalledWith(req.params._id)
    expect(res.statusCode).toBe(500)
    expect(res._getData()).toStrictEqual('Internal Server Error')
  })
})
