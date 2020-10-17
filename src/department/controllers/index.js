const makePostDepartment = require('./postDepartment')
const makeGetDepartments = require('./getDepartments')
const makeDeleteDepartment = require('./deleteDepartment')
const departmentService = require("../use-cases");

const postDepartment = makePostDepartment({ addDepartment: departmentService.addDepartment })
const getDepartments = makeGetDepartments({ fetchDepartments: departmentService.fetchDepartments })
const deleteDepartment = makeDeleteDepartment({ removeDepartment: departmentService.removeDepartment })

const departmentControllers = Object.freeze({
  postDepartment,
  getDepartments,
  deleteDepartment
})

module.exports = departmentControllers
