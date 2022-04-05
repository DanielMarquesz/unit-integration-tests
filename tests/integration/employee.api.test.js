const request = require('supertest')
const app = require('../../src/index')
const mongodb = require('../../src/utils/mongodb')
const endpointUrl = '/api'

describe(`Validate`, () => {
  jest.setTimeout(15000)
  it("Get/", async()=>{
    const response = await request(app)
    .get(`/employee`)
    console.log(response.body)
    expect(response.statusCode).toBe(200)
  })
})
