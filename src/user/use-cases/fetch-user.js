module.exports = function makeFetchUser ({ usersDb, Encrypt, Token }) {
  return async function fetchUser ({ username, password }) {
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

    const token = Token.sign({
      id: user.id,
      username: user.username
    })

    return token
  }
}