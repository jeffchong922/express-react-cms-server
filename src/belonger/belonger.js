module.exports = function buildMakeBelonger ({ Id }) {
  return function makeBelonger ({ id, username }) {
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