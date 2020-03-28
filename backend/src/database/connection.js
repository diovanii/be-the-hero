const knex = require('knex')
const knexConfiguration = require('../../knexfile')

const knexConfig = process.env.NODE_ENV === 'test' ? knexConfiguration.test : knexConfiguration.development

const connection = knex(knexConfig)

module.exports = connection
