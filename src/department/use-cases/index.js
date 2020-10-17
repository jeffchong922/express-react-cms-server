const departmentsDb = require('../data-access')

const makeAddDepartment = require('./add-department')
const makeFetchDepartments = require('./fetch-departments')
const makeRemoveDepartment = require('./remove-department')
const makeEditDepartment = require('./edit-department')

const addDepartment = makeAddDepartment({ departmentsDb })
const fetchDepartments = makeFetchDepartments({ departmentsDb })
const removeDepartment = makeRemoveDepartment({ departmentsDb })
const editDepartment = makeEditDepartment({ departmentsDb })

const departmentService = Object.freeze({
  addDepartment,
  fetchDepartments,
  removeDepartment,
  editDepartment
})

module.exports = departmentService