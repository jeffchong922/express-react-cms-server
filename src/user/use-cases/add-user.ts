import makeUser from "..";
import { MakeUserProps } from '../user'
import logger from "../../helpers/logger";
import { UsersDbType } from "../data-access";

interface MakeAddUserProps {
  usersDb: UsersDbType
}

interface AddUserInfo extends MakeUserProps {
}

export default function makeAddUser ({ usersDb }: MakeAddUserProps) {
  return async function addUser (userInfo: AddUserInfo) {
    const user = makeUser(userInfo)

    const exist = await usersDb.findByName({ username: user.getUsername() })
    if (exist) {
      const error = new Error('用户已注册')
      // error.statusCode = 409
      throw error
    }

    const inserted = await usersDb.insert({
      id: user.getId(),
      salt: user.getSalt(),
      username: user.getUsername(),
      password: user.getPassword()
    })
    logger.debug(`添加用户结果: ${JSON.stringify(inserted, null, 2)}`)
    return inserted
  }
}