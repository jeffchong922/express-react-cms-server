const Id = require('../helpers/id')

const buildMakeDepartment = require('./department')

const makeDepartment = buildMakeDepartment({ Id })

module.exports = makeDepartment