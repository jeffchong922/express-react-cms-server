import { IdType } from "../helpers/id"

interface BuildMakeBelongProps {
  Id: IdType
}

export interface MakeBelongProps {
  id: string
  username: string
}

export default function buildMakeBelong ({ Id }: BuildMakeBelongProps) {
  return function makeBelong ({ id, username }: MakeBelongProps) {
    if (!id) {
      throw new Error('所属者数据缺少 id 字段')
    }
    if (!Id.isValidId(id)) {
      throw new Error('所属者数据不具备有效 id ')
    }
    if (!username) {
      throw new Error('所属者数据缺少 username 字段')
    }

    return Object.freeze({
      getId: () => id,
      getUsername: () => username
    })
  }
}