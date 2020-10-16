const departmentsDb = require('../data-access')

const makeAddDepartment = require('./add-department')
const MakeFetchDepartments = require('./fetch-departments')

const addDepartment = makeAddDepartment({ departmentsDb })
const fetchDepartments = MakeFetchDepartments({ departmentsDb })

const departmentService = Object.freeze({
  addDepartment,
  fetchDepartments
})

module.exports = departmentService