const logger = require('../../helpers/logger');
const makeBelonger = require('../../belonger');

module.exports = function makeFetchDepartments ({ departmentsDb }) {
  return async function fetchDepartments ({ belonger, id, pageNumber, pageSize }) {
    const validBelonger = makeBelonger(belonger)

    if (id) {
      const department = await departmentsDb.findById({ id })
      if (department) {
        logger.debug(`查询 ${id} 部门结果: ${JSON.stringify(department, null, 2)}`)
        return {
          list: [department],
          total: 1
        }
      } else {
        const error = new Error(`id : ${id} 的部门数据未找到`)
        error.statusCode = 404
        throw error
      }
    }

    if (!pageNumber || !pageSize) {
      throw new Error('请携带 pageNumber 和 pageSize 查询条件')
    }
    pageNumber = parseInt(pageNumber) || 1
    pageSize = parseInt(pageSize) || 10
    const departments = await departmentsDb.findAll({ belongerId: validBelonger.getId(), pageNumber, pageSize })
    logger.debug(`查询用户 ${validBelonger.getUsername()} 部门结果: ${JSON.stringify(departments, null, 2)}`)

    return departments
  }
}