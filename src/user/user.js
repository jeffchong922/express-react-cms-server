module.exports = function buildMakeUser ({
  Id, Encrypt
}) {
  return function makeUser ({
    id = Id.makeId(),
    username,
    password
  }) {
    
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