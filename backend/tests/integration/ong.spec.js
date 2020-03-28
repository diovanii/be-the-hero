const supertest = require('supertest')
const app = require('../../src/app')
const database = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await database.migrate.rollback()
    await database.migrate.latest()
  })

  afterAll(async () => {
    await database.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await supertest(app).post('/ongs').send({
      name: 'APAD',
      email: 'contato@apad.com',
      whatsapp: '4970707070',
      city: 'Rio do Sul',
      uf: 'SC'
    })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
