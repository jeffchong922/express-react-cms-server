const logger = require("../../helpers/logger")

module.exports = function makePostDepartment ({ addDepartment }) {
  return async function postDepartment (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const departmentInfo = httpRequest.body
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, departmentInfo, { belonger: payload })
      const inserted = await addDepartment(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          inserted
        }
      }
    } catch (e) {
      logger.error(`post-department 错误: ${e.message}`)
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