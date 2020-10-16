const makePostDepartment = require('./postDepartment')
const departmentService = require("../use-cases");

const postDepartment = makePostDepartment({ addDepartment: departmentService.addDepartment })

const departmentControllers = Object.freeze({
  postDepartment
})

module.exports = departmentControllers
