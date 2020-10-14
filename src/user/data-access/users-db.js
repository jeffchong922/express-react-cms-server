const Id = require("../../helpers/id");

module.exports = function makeUsersDb ({ makeDb, colName }) {
  return Object.freeze({
    insert,
    findByName
  })

  async function insert ({ id: _id = Id.makeId(), ...userInfo }) {
    const db = await makeDb()
    const result = await db.collection(colName).insertOne({
      _id,
      ...userInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findByName ({ username }) {
    const db = await makeDb()
    const result = await db.collection(colName).findOne({ username })
    if (result) {
      const { _id: id, ...userInfo } = result
      return {
        id,
        ...userInfo
      }
    }
    return result
  }
}