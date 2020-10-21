import { EncryptType } from "../helpers/encrypt"
import { IdType } from "../helpers/id"

interface BuildMakeUserProps {
  Id: IdType
  Encrypt: EncryptType
}

export interface MakeUserProps {
  id?: string
  username: string
  password: string
}

export default function buildMakeUser ({ Id, Encrypt }: BuildMakeUserProps) {
  return function makeUser ({
    id = Id.makeId(),
    username,
    password
  }: MakeUserProps) {
    
    if (!Id.isValidId(id)) {
      throw new Error('用户数据不具备有效 id')
    }

    if (!username) {
      throw new Error('用户数据缺少 username 字段')
    }

    if (!password) {
      throw new Error('用户数据缺少 password 字段')
    }

    const salt = Encrypt.genSaltSync()
    password = Encrypt.hashSync(password, salt)

    return Object.freeze({
      getUsername: () => username,
      getPassword: () => password,
      getSalt: () => salt,
      getId: () => id
    })
  }
  
}