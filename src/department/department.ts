import { MakeBelongType } from "../belong"
import { MakeBelongProps } from '../belong/belong'
import { IdType } from "../helpers/id"

interface BuildMakeDepartmentProps {
  Id: IdType
  makeBelong: MakeBelongType
}

interface MakeDepartmentProps {
  id?: string
  name: string
  memberCount?: number
  status?: boolean
  introduction: string
  belong: MakeBelongProps
}

export default function buildMakeDepartment ({
  Id, makeBelong
}: BuildMakeDepartmentProps) {
  return function makeDepartment ({
    id = Id.makeId(),
    name,
    memberCount = 0,
    status = true,
    introduction,
    belong
  }: MakeDepartmentProps) {
    
    if (!Id.isValidId(id)) {
      throw new Error('部门数据不具备有效 id')
    }

    if (!name) {
      throw new Error('部门数据缺少 name 字段')
    }

    if (memberCount < 0 || memberCount > 100 || typeof memberCount !== 'number') {
      throw new Error('部门数据 memberCount 字段非有效值')
    }

    if (typeof status !== 'boolean') {
      throw new Error('部门数据 status 字段非有效值')
    }

    if (!introduction) {
      throw new Error('部门数据缺少 introduction 字段')
    }

    const validBelong = makeBelong(belong)
    
    return Object.freeze({
      getIntroduction: () => introduction,
      getMemberCount: () => memberCount,
      getBelong: () => validBelong,
      getStatus: () => status,
      getName: () => name,
      getId: () => id
    })
  }
  
}