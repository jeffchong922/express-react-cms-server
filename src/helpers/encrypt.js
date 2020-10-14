const bcryptjs = require('bcrypt')

function isValidData ({ salt, originData, hashData }) {
  const hash = bcryptjs.hashSync(originData, salt)
  return hash === hashData
}

module.exports = Object.freeze({
  genSaltSync: bcryptjs.genSaltSync,
  hashSync: bcryptjs.hashSync,
  isValidData
})