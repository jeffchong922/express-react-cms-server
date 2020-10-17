const Id = require("../../helpers/id");

module.exports = function makeUsersDb ({ makeDb, colName }) {
  return Object.freeze({
    insert,
    remove,
    update,
    findAll,
    findById,
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

  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(colName).deleteOne({ _id })
    return result
  }

  async function update ({ id: _id, ...departmentInfo }) {
    const db = await makeDb()
    const result = await db.collection(colName).updateOne(
      { _id },
      { $set: { ...departmentInfo } }
    )
    return result
  }

  async function findAll ({ belongerId, pageNumber, pageSize }) {
    const db = await makeDb()
    const query = {
      'belonger.id': {
        $eq: belongerId
      }
    }
    const result = await db.collection(colName).find(query).toArray()
    const total = result.length

    if (total <= 0) {
      return {
        list: [],
        total: 0
      }
    }

    // 数据处理
    const list = result.slice(pageSize * (pageNumber - 1), pageSize * pageNumber).map(department => {
      const { _id: id, ...departmentInfo } = department
      return {
        id,
        ...departmentInfo
      }
    })
    return {
      list,
      total
    }
  }

  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(colName).findOne({ _id })
    if (result) {
      const { _id: id, ...departmentInfo } = result
      return {
        id,
        ...departmentInfo
      }
    }
    return null
  }

  async function findByName ({ name, belongerId }) {
    const db = await makeDb()
    const query = {
      name,
      'belonger.id': {
        $eq: belongerId
      }
    }
    const result = await db.collection(colName).findOne(query)
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