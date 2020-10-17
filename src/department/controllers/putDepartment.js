const logger = require("../../helpers/logger")

module.exports = function makePutDepartment ({ editDepartment }) {
  return async function putDepartment (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const departmentInfo = httpRequest.body
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, departmentInfo, { belonger: payload })
      const updated = await editDepartment(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          updated
        }
      }
    } catch (e) {
      logger.error(`put-department 错误: ${e.message}`)
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