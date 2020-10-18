const logger = require("../../helpers/logger")

module.exports = function makeDeleteDepartments ({ removeDepartment }) {
  return async function deleteDepartments (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { total, ...deleteObjList } = httpRequest.query

      // 获取待删除 id 列表
      let deleteArray = []
      if (+total > 0) {
        deleteArray = Object.keys(deleteObjList)
          .filter(key => /^depart\d$/.test(key))
          .map(key => deleteObjList[key])
      }

      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, { deleteArray }, { belonger: payload })
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