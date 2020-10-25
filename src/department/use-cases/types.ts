import { MakeBelongProps } from "../../belong/types";
import { DepartmentsDb } from "../data-access";
import { MakeDepartmentProps } from "../types";

export interface IncludeDb {
  departmentsDb: DepartmentsDb
}

export type MakeAddDepartmentProps = IncludeDb

export type AddDepartmentProps = MakeDepartmentProps

export type MakeEditDepartmentProps = IncludeDb

export type EditDepartmentProps = MakeDepartmentProps

export type MakeFetchDepartmentsProps = IncludeDb

export interface FetchDepartmentsProps {
  belong?: MakeBelongProps
  id?: string
  pageNumber?: string
  pageSize?: string
  searchName?: string
  nameOnly?: string
}

export type MakeRemoveDepartmentsProps = IncludeDb

export interface RemoveDepartmentsProps {
  belong?: MakeBelongProps
  deleteArray?: string[]
}