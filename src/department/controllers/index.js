const makePostDepartment = require('./postDepartment')
const makeGetDepartments = require('./getDepartments')
const makeDeleteDepartment = require('./deleteDepartment')
const makePutDepartment = require('./putDepartment')
const departmentService = require("../use-cases");

const postDepartment = makePostDepartment({ addDepartment: departmentService.addDepartment })
const getDepartments = makeGetDepartments({ fetchDepartments: departmentService.fetchDepartments })
const deleteDepartment = makeDeleteDepartment({ removeDepartment: departmentService.removeDepartment })
const putDepartment = makePutDepartment({ editDepartment: departmentService.editDepartment })

const departmentControllers = Object.freeze({
  postDepartment,
  getDepartments,
  deleteDepartment,
  putDepartment
})

module.exports = departmentControllers
