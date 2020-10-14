const Id = require('../helpers/id')
const Encrypt = require('../helpers/encrypt')

const buildMakeUser = require('./user')

const makeUser = buildMakeUser({ Id, Encrypt })

module.exports = makeUser