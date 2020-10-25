import { FindExistIdProps } from './types'

export default async function findExistId<T> ({ id, belongId, whenExistThrow, whenNotFoundThrow, dbInstance }: FindExistIdProps<T>): Promise<T> {
  const exist = await dbInstance.findById({ id, belongId })
  if ((exist && whenExistThrow) || (!exist && whenNotFoundThrow)) {
    const error: any = new Error(exist ? '数据已存在' : '数据不存在')
    error.status = exist ? 409 : 404
    throw error
  }
  return exist
}