import { Db } from "mongodb"

interface BaseInfo {
  name: string
  status: boolean
  memberCount: number
  introduction: string
  belong: {
    id: string
    username: string
  }
}

export type DepartmentSchema = {
  _id: string
} & BaseInfo

export interface MakeDepartmentsDbProps {
  makeDb: () => Promise<Db>
  colName: string
}

export type InsertProps = {
  id?: string
} & BaseInfo

export interface RemoveProps {
  id: string
}

export interface RemoveManyProps {
  idList: Array<string>
}

export type UpdateProps = {
  id: string
} & {
  [prop in keyof BaseInfo]?: BaseInfo[prop]
}

export interface FindAllProps {
  belongId: string
  pageNumber: number
  pageSize: number
  searchNameReg: RegExp
}

export interface FindAllWithoutPageProps {
  belongId: string
}

export interface FindByIdProps {
  id: string
}

export interface FindByNameProps {
  name: string
  belongId: string
}