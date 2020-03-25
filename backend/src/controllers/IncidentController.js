const database = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    const [countIncidents] = await database('incidents').count()

    const incidents = await database('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset(( page - 1 ) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    response.header('X-Total-Count', countIncidents['count(*)'])

    return response.json(incidents)
  },

  async create(request, response) {
    const { title, description, value } = request.body
    const ongId = request.headers.authorization

    const [id] = await database('incidents').insert({
      title,
      description,
      value,
      ong_id: ongId
    })

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params
    const ongId = request.headers.authorization

    const incident = await database('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident.ong_id !== ongId) {
      return response.status(401).json({ error: 'Operation not permitted' })
    }

    await database('incidents')
      .where('id', id)
      .delete()

    return response.status(204).send()
  }
}
