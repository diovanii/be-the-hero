const generateUniqueId = require('../utils/generateUniqueId')
const database = require('../database/connection')

module.exports = {

  async index(request, response) {
    const ongs = await database('ongs').select('*')

    return response.json(ongs)
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body

    const id = generateUniqueId()

    await database('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id })
  }
}
