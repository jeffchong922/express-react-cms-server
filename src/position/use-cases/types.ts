import { MakeBelongProps } from '../../belong/types'
import { DepartmentsDb } from '../../department/data-access'
import { PositionsDb } from '../data-access'
import { MakePositionProps } from '../types'

export interface IncludeDb {
  positionsDb: PositionsDb
}

export type MakeAddPositionProps = IncludeDb & {
  findExistName: <T>(props: FindExistNameProps<T>) => Promise<T>
  departmentsDb: DepartmentsDb
}

export type AddPositionProps = MakePositionProps

export type MakeFetchPositionsProps = IncludeDb & {
  findExistId: <T>(props: FindExistIdProps<T>) => Promise<T>
  departmentsDb: DepartmentsDb
}

export interface FetchPositionsProps {
  belong?: MakeBelongProps
  id?: string
  searchName?: string
  searchDepartmentIds?: string[]
}

export interface FetchPositionsResult {
  total: number
  list: Array<{
    id: string
    name: string
    introduction: string
    status: boolean
    departmentInfo: {
      id: string
      name: string
    }
  }>
}

export type MakeEditPositionProps = IncludeDb & {
  findExistId: FindExistId
  findExistName: FindExistName
}

export type EditPositionProps = MakePositionProps

export type MakeRemovePositionsProps = IncludeDb

export type RemovePositionsProps = {
  belong?: MakeBelongProps
  deleteArray?: string[]
}

export type FindExistName = <T>(props: FindExistNameProps<T>) => Promise<T>

export interface FindExistNameProps<T> {
  name: string
  belongId: string
  departmentId: string
  whenExistThrow: boolean
  whenNotFoundThrow: boolean
  dbInstance: {
    findByName: (props: { name: string, belongId: string, departmentId: string }) => T
  }
}

export type FindExistId = <T>(props: FindExistIdProps<T>) => Promise<T>

export interface FindExistIdProps<T> {
  id: string
  belongId: string
  whenExistThrow: boolean
  whenNotFoundThrow: boolean
  dbInstance: {
    findById: (props: { id: string, belongId: string }) => T
  }
}