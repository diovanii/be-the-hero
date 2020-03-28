const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const OngValidator = require('./validators/OngValidator')
const IncidentValidator = require('./validators/IncidentValidator')
const ProfileValidator = require('./validators/ProfileValidator')
const SessionValidator = require('./validators/SessionValidator')

const routes = express.Router()

routes.post('/sessions', SessionValidator.create(), SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngValidator.create(), OngController.create) 

routes.get('/profile', ProfileValidator.index(), ProfileController.index)

routes.get('/incidents', IncidentValidator.index(), IncidentController.index)
routes.post('/incidents', IncidentValidator.create(), IncidentController.create)
routes.delete('/incidents/:id', IncidentValidator.delete(), IncidentController.delete)

module.exports = routes
