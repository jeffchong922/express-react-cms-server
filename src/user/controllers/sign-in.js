const logger = require("../../helpers/logger")

module.exports = function makeSignIn ({ fetchUser }) {
  return async function signIn (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = httpRequest.body
      const token = await fetchUser(userInfo)
      return {
        headers,
        statusCode: 200,
        body: {
          token
        }
      }
    } catch (e) {
      logger.error(`sign-in 错误: ${e.message}`)
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