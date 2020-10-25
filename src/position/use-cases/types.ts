import { PositionsDb } from '../data-access'
import { MakePositionProps } from '../types'

export interface IncludeDb {
  positionsDb: PositionsDb
}

export type MakeAddPositionProps = IncludeDb & {
  findExistName: <T>(props: FindExistNameProps<T>) => Promise<T>
}

export type AddPositionProps = MakePositionProps


export interface FindExistNameProps<T> {
  name: string
  belongId: string
  whenExistThrow: boolean
  whenNotFoundThrow: boolean
  dbInstance: {
    findByName: (props: { name: string, belongId: string }) => T
  }
}