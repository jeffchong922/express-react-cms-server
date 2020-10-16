const Id = require('../helpers/id')

const buildMakeBelonger = require('./belonger')

const makeBelonger = buildMakeBelonger({ Id })

module.exports = makeBelonger