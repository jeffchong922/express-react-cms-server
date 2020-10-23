import { DepartmentServices } from "../use-cases";

export interface MakeDeleteDepartmentsProps {
  removeDepartments: DepartmentServices['removeDepartments']
}

export interface MakeGetDepartmentsProps {
  fetchDepartments: DepartmentServices['fetchDepartments']
}

export interface MakePostDepartmentProps {
  addDepartment: DepartmentServices['addDepartment']
}

export interface MakePutDepartmentProps {
  editDepartment: DepartmentServices['editDepartment']
}