const logger = require('../../helpers/logger');
const makeBelonger = require('../../belonger');

module.exports = function makeRemoveDepartments ({ departmentsDb }) {
  return async function removeDepartments ({ belonger, id }) {
    const validBelonger = makeBelonger(belonger)

    if (!id) {
      throw new Error('删除部门数据需要提供 departId 字段')
    }

    const departmentToDelete = await departmentsDb.findById({ id })

    if (!departmentToDelete) {
      return deleteNothing()
    }

    if (!isBelongTo(departmentToDelete, validBelonger.getId())) {
      return deleteNothing()
    }

    return deleteOne(departmentToDelete)
  }

  function deleteNothing (message = '部门未找到') {
    return {
      deletedCount: 0,
      message
    }
  }

  function isBelongTo (department, belongerId) {
    return department.belonger.id === belongerId
  }

  async function deleteOne (department) {
    const departmentName = department.name
    const deleted = await departmentsDb.remove(department)
    logger.debug(`部门删除结果: ${JSON.stringify(deleted, null, 2)}`)
    return {
      deleteCount: 1,
      message: `${departmentName} 已删除`
    }
  }
}