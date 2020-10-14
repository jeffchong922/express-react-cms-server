const jwt = require('jsonwebtoken')

const tokenSecret = 'jsonwebtoken'

function sign (payload) {
  return jwt.sign(payload, tokenSecret)
}

function getPayload (token) {
  if (!token) {
    throw new Error('请携带验证信息')
  }
  let payload
  try {
    payload = jwt.verify(token, tokenSecret)
  } catch (e) {
    throw new Error('请携带有效验证信息')
  }
  return payload
}

module.exports = Object.freeze({
  sign,
  getPayload
})