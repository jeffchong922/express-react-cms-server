const logger = require('../../helpers/logger');
const makeUser = require('../index');

module.exports = function makeAddUser ({ usersDb }) {
  return async function addUser (userInfo) {
    const user = makeUser(userInfo)

    const exist = await usersDb.findByName({ username: user.getUsername() })
    if (exist) {
      const error = new Error('用户已注册')
      error.statusCode = 409
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