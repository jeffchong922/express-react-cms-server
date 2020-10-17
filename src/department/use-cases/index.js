const departmentsDb = require('../data-access')

const makeAddDepartment = require('./add-department')
const makeFetchDepartments = require('./fetch-departments')
const makeRemoveDepartment = require('./remove-department')

const addDepartment = makeAddDepartment({ departmentsDb })
const fetchDepartments = makeFetchDepartments({ departmentsDb })
const removeDepartment = makeRemoveDepartment({ departmentsDb })

const departmentService = Object.freeze({
  addDepartment,
  fetchDepartments,
  removeDepartment
})

module.exports = departmentService