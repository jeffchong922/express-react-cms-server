const departmentsDb = require('../data-access')

const makeAddDepartment = require('./add-department')

const addDepartment = makeAddDepartment({ departmentsDb })

const departmentService = Object.freeze({
  addDepartment
})

module.exports = departmentService