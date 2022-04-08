const request = require('supertest')
const app = require('../../server')
const mongodb = require('../../src/utils/mongodb')
const endpointUrl = '/api'

describe('Validate' + endpointUrl, () => {

  it("Get /employee", async() => {
    const response = await request(app).get(`${endpointUrl}/employee`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(
      [
        {
          "__v": 0,
          "_id": "624cc28fa3960d0352522b96",
          "created_at": "2022-04-05T22:28:31.906Z",
          "email": "ro@gmail.com",
          "name": "Daniel Marques",
          "password": "$2b$10$E.vOfLQe4o7lDBWskZr4au9yQbcpkKgWlqu0LJxEDPpsvEoYuL3J."
        }
      ]
    )
  })
})
