import { Db } from "mongodb";

interface BaseInfo {
  name: string
  status: boolean
  departmentId: string
  introduction: string
  belong: {
    id: string
    username: string
  }
}

export type PositionSchema = {
  _id: string
} & BaseInfo

export interface MakePositionsDbProps {
  makeDb: () => Promise<Db>
  colName: string
}

export interface FindByNameProps {
  name: string
  departmentId: string
  belongId: string
}

export type InsertProps = BaseInfo & {
  id?: string
}

export interface FindByIdProps {
  id: string
  belongId: string
}

export interface FindByFilterProps {
  belongId: string
  departmentIds: string[]
  searchName: RegExp
}

export type UpdateProps = {
  id: string
} & {
  [prop in keyof BaseInfo]?: BaseInfo[prop]
}