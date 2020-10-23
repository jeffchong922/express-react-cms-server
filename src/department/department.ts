import { BuildMakeDepartmentProps, MakeDepartmentProps } from './types'

export default function buildMakeDepartment ({ Id, makeBelong }: BuildMakeDepartmentProps) {
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

    if (!name || !name.trim()) {
      throw new Error('部门数据缺少 name 字段')
    }

    if (memberCount < 0 || memberCount > 100 || typeof memberCount !== 'number') {
      throw new Error('部门数据 memberCount 字段非有效值')
    }

    if (typeof status !== 'boolean') {
      throw new Error('部门数据 status 字段非有效值')
    }

    if (!introduction || !introduction.trim()) {
      throw new Error('部门数据缺少 introduction 字段')
    }

    const validBelong = makeBelong(belong || {})
    
    return Object.freeze({
      getIntroduction: () => introduction.trim(),
      getMemberCount: () => memberCount,
      getBelong: () => validBelong,
      getStatus: () => status,
      getName: () => name.trim(),
      getId: () => id
    })
  }
  
}