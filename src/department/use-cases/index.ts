import departmentsDb from "../data-access"
import makeAddDepartment from "./add-department"
import makeEditDepartment from "./edit-department"
import makeFetchDepartments from "./fetch-departments"
import makeRemoveDepartments from "./remove-departments"

const addDepartment = makeAddDepartment({ departmentsDb })
const fetchDepartments = makeFetchDepartments({ departmentsDb })
const removeDepartments = makeRemoveDepartments({ departmentsDb })
const editDepartment = makeEditDepartment({ departmentsDb })

const departmentServices = Object.freeze({
  addDepartment,
  fetchDepartments,
  removeDepartments,
  editDepartment
})

export type DepartmentServices = typeof departmentServices

export default departmentServices