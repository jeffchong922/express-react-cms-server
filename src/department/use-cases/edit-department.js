const logger = require('../../helpers/logger');
const makeDepartment = require('../index');

module.exports = function makeEditDepartments ({ departmentsDb }) {
  return async function editDepartments ({ id, ...change }) {
    if (!id) {
      throw new Error('更新部门数据需要提供 id 字段')
    }
    
    const exist = await findById({ id })

    const department = makeDepartment({ ...exist, ...change })
    const belonger = department.getBelonger()

    // 避免部门名冲突
    if (exist.name !== department.getName()) {
      await throwWhenExist({ name: department.getName(), belongerId: belonger.getId() })
    }
    
    return updateOne(department)
  }

  async function findById ({ id }) {
    const exist = await departmentsDb.findById({ id })
    if (!exist) {
      const error = new Error('更新的部门数据未找到')
      error.statusCode = 404
      throw error
    }
    return exist
  }

  async function throwWhenExist ({ name, belongerId }) {
    const exist = await departmentsDb.findByName({ name, belongerId })
    if (exist) {
      const error = new Error('所要更新的部门名称已存在')
      error.statusCode = 409
      throw error
    }
    return exist
  }

  async function updateOne (department) {
    const updated = await departmentsDb.update({
      id: department.getId(),
      name: department.getName(),
      status: department.getStatus(),
      memberCount: department.getMemberCount(),
      introduction: department.getIntroduction()
    })
    logger.debug(`部门更新结果: ${JSON.stringify(updated, null, 2)}`)
    return {
      updateCount: 1,
      message: `部门数据已更新`
    }
  }
}