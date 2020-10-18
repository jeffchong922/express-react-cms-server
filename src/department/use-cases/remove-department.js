const logger = require('../../helpers/logger');
const makeBelonger = require('../../belonger');

module.exports = function makeRemoveDepartments ({ departmentsDb }) {
  return async function removeDepartments ({ belonger, deleteArray }) {
    const validBelonger = makeBelonger(belonger)

    if (deleteArray.length <= 0) {
      throw new Error('缺少删除部门数据需要的 depart\\d 字段')
    }

    const { list: departmentList } = await departmentsDb.findAllWithoutPage({ belongerId: validBelonger.getId() })
    const departmentIdList = getIdList(departmentList)

    if (departmentIdList.length <= 0) {
      return deleteNothing()
    }

    const belongList = getBelongList(departmentIdList, deleteArray)
    if (belongList.length <= 0) {
      return deleteNothing()
    }

    return deleteMany(belongList)
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

  function getIdList (list) {
    return list.map(item => item.id)
  }

  function getBelongList (departmentIdList, deleteArray) {
    return deleteArray.filter(id => departmentIdList.includes(id))
  }

  async function deleteMany (idList) {
    const deleted = await departmentsDb.removeMany({ idList })
    logger.debug(`部门删除结果: ${JSON.stringify(deleted, null, 2)}`)
    const { deletedCount: deleteCount } = deleted
    return {
      deleteCount,
      message: `成功删除数据数目 ${deleteCount}`
    }
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