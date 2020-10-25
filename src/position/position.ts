import { BuildMakePositionProps, MakePositionProps } from "./types";

export default function buildMakePosition ({ Id, makeBelong }: BuildMakePositionProps) {
  return function makePosition ({
    id = Id.makeId(),
    name,
    departmentId,
    status = true,
    introduction = '',
    belong
  }: MakePositionProps) {

    if (!Id.isValidId(id)) {
      throw new Error('职位数据不具备有效 id')
    }

    if (typeof departmentId !== 'string') {
      throw new Error('职位数据缺少 departmentId 字段')
    }

    if (!Id.isValidId(departmentId)) {
      throw new Error('职位数据的 departmentId 不具备有效 id')
    }

    if (!name || !name.trim()) {
      throw new Error('职位数据缺少 name 字段')
    }

    if (typeof status !== 'boolean') {
      throw new Error('职位数据 status 字段非有效值')
    }

    if (typeof introduction !== 'string') {
      throw new Error('职位数据 introduction 字段非有效值')
    }

    const validBelong = makeBelong(belong || {})

    return Object.freeze({
      getIntroduction: () => introduction.trim(),
      getDepartmentId: () => departmentId,
      getBelong: () => validBelong,
      getStatus: () => status,
      getName: () => name.trim(),
      getId: () => id
    })
  }
}