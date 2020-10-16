const Id = require('../helpers/id')
const makeBelonger = require('../belonger')

const buildMakeDepartment = require('./department')

const makeDepartment = buildMakeDepartment({ Id, makeBelonger })

module.exports = makeDepartment