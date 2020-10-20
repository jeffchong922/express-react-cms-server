const logger = require("../../helpers/logger")

module.exports = function makeGetDepartments ({ fetchDepartments }) {
  return async function getDepartments (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { departId, pageNumber, pageSize, searchName } = httpRequest.query
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, { id: departId, pageNumber, pageSize, searchName }, { belonger: payload })
      const fetched = await fetchDepartments(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          fetched
        }
      }
    } catch (e) {
      logger.error(`get-departments 错误: ${e.message}`)
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