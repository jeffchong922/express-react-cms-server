const makePostDepartment = require('./postDepartment')
const makeGetDepartments = require('./getDepartments')
const departmentService = require("../use-cases");

const postDepartment = makePostDepartment({ addDepartment: departmentService.addDepartment })
const getDepartments = makeGetDepartments({ fetchDepartments: departmentService.fetchDepartments})

const departmentControllers = Object.freeze({
  postDepartment,
  getDepartments
})

module.exports = departmentControllers
