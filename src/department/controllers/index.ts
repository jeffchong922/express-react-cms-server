import departmentServices from "../use-cases";
import makeDeleteDepartments from "./deleteDepartment";
import makeGetDepartments from "./getDepartments";
import makePostDepartment from "./postDepartment";
import makePutDepartment from "./putDepartment";

const postDepartment = makePostDepartment({ addDepartment: departmentServices.addDepartment })
const getDepartments = makeGetDepartments({ fetchDepartments: departmentServices.fetchDepartments })
const deleteDepartment = makeDeleteDepartments({ removeDepartments: departmentServices.removeDepartments })
const putDepartment = makePutDepartment({ editDepartment: departmentServices.editDepartment })

const departmentControllers = Object.freeze({
  postDepartment,
  getDepartments,
  deleteDepartment,
  putDepartment
})

export type DepartmentControllers = typeof departmentControllers

export default departmentControllers
