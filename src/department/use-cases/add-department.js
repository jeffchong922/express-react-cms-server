const logger = require('../../helpers/logger');
const makeDepartment = require('../index');

module.exports = function makeAddDepartment ({ departmentsDb }) {
  return async function addDepartment (departmentInfo) {
    const department = makeDepartment(departmentInfo)
    const belonger = department.getBelonger()

    const exist = await departmentsDb.findByName({ name: department.getName(), belongerId: belonger.getId() })
    if (exist) {
      const error = new Error('部门已注册')
      error.statusCode = 409
      throw error
    }

    const inserted = await departmentsDb.insert({
      id: department.getId(),
      belonger: {
        id: belonger.getId(),
        username: belonger.getUsername()
      },
      name: department.getName(),
      status: department.getStatus(),
      memberCount: department.getMemberCount(),
      introduction: department.getIntroduction()
    })
    logger.debug(`添加部门结果: ${JSON.stringify(inserted, null, 2)}`)
    return inserted
  }
}