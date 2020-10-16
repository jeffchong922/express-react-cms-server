const Id = require("../../helpers/id");

module.exports = function makeUsersDb ({ makeDb, colName }) {
  return Object.freeze({
    insert,
    findByName
  })

  async function insert ({ id: _id = Id.makeId(), ...departmentInfo }) {
    const db = await makeDb()
    const result = await db.collection(colName).insertOne({
      _id,
      ...departmentInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findByName ({ name }) {
    const db = await makeDb()
    const result = await db.collection(colName).findOne({ name })
    if (result) {
      const { _id: id, ...departmentInfo } = result
      return {
        id,
        ...departmentInfo
      }
    }
    return result
  }
}