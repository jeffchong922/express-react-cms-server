const logger = require("../../helpers/logger")

module.exports = function makeDeleteDepartments ({ removeDepartment }) {
  return async function deleteDepartments (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { departId } = httpRequest.query
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, { id: departId }, { belonger: payload })
      const deleted = await removeDepartment(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          deleted
        }
      }
    } catch (e) {
      logger.error(`delete-department 错误: ${e.message}`)
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