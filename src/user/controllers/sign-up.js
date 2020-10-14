const logger = require("../../helpers/logger")

module.exports = function makeSignUp ({ addUser }) {
  return async function signUp (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = httpRequest.body
      const registered = await addUser(userInfo)
      return {
        headers,
        statusCode: 201,
        body: {
          registered
        }
      }
    } catch (e) {
      logger.error(`sign-up 错误: ${e.message}`)
      return {
        headers,
        statusCode: e.statusCode || 400,
        body: {
          error: e.message
        }
      }
    }
  }
}