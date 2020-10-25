import { FindExistNameProps } from './types'

export default async function findExistName<T> ({ name, belongId, departmentId, whenExistThrow, whenNotFoundThrow, dbInstance }: FindExistNameProps<T>): Promise<T> {
  const exist = await dbInstance.findByName({ name, belongId, departmentId })
  if ((exist && whenExistThrow) || (!exist && whenNotFoundThrow)) {
    const error: any = new Error(exist ? '所添加的数据已存在' : '所查询的数据不存在')
    error.status = 409
    throw error
  }
  return exist
}