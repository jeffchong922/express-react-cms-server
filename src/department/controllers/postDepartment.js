const logger = require("../../helpers/logger")

module.exports = function makePostDepartment ({ addDepartment }) {
  return async function postDepartment (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const departmentInfo = httpRequest.body
      const inserted = await addDepartment(departmentInfo)
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