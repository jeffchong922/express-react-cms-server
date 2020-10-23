import { EncryptType } from "../../helpers/encrypt"
import { TokenType } from "../../helpers/token"
import { UsersDbType } from "../data-access"

interface MakeFetchUserProps {
  usersDb: UsersDbType
  Encrypt: EncryptType
  Token: TokenType
}

interface FetchUserProps {
  username: string
  password: string
  token: string
}

export default function makeFetchUser ({ usersDb, Encrypt, Token }: MakeFetchUserProps) {
  return async function fetchUser ({ username, password, token }: FetchUserProps) {

    if (token) {
      return fetchByToken(token)
    }

    if (!username || !password) {
      throw new Error('用户信息不完整')
    }

    const user = await usersDb.findByName({ username })
    if (!user) {
      throw new Error('用户信息未注册')
    }

    const isValid = Encrypt.isValidData({
      salt: user.salt,
      originData: password,
      hashData: user.password
    })
    if (!isValid) {
      throw new Error('用户密码校验错误')
    }

    const userToken = Token.sign({
      id: user.id,
      username: user.username
    })

    return {
      token: userToken,
      id: user.id,
      username: user.username
    }
  }

  async function fetchByToken (token: string) {
    const { username } = Token.getPayload(token)
    
    const user = await usersDb.findByName({ username })
    if (!user) {
      throw new Error('用户信息未注册')
    }

    return {
      token,
      id: user.id,
      username: user.username
    }
  }
}