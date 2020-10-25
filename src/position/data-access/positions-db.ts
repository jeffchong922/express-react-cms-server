import { FilterQuery } from "mongodb";
import Id from "../../helpers/id";
import { FindByFilterProps, FindByIdProps, FindByNameProps, InsertProps, MakePositionsDbProps, PositionSchema } from "./types";

export default function makePositionsDb ({ makeDb, colName }: MakePositionsDbProps) {
  return Object.freeze({
    findByName,
    insert,
    findById,
    findByFilter
  })

  async function findByName ({ name, belongId, departmentId }: FindByNameProps) {
    const db = await makeDb()
    const query: FilterQuery<PositionSchema> = {
      name,
      departmentId,
      'belong.id': {
        $eq: belongId
      }
    }
    const result = await db.collection<PositionSchema>(colName).findOne(query)
    if (result) {
      const { _id: id, ...otherInfo } = result
      return {
        id,
        ...otherInfo
      }
    }
    return null
  }

  async function insert ({ id: _id = Id.makeId(), ...positionInfo }: InsertProps) {
    const db = await makeDb()
    const result = await db.collection<PositionSchema>(colName).insertOne({
      _id,
      ...positionInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findById ({ id: _id, belongId }: FindByIdProps) {
    const db = await makeDb()
    const query: FilterQuery<PositionSchema> = {
      name,
      'belong.id': {
        $eq: belongId
      }
    }
    const result = await db.collection<PositionSchema>(colName).findOne(query)
    if (result) {
      const { _id: id, ...otherInfo } = result
      return {
        id,
        ...otherInfo
      }
    }
    return null
  }

  async function findByFilter ({ departmentIds, belongId, searchName }: FindByFilterProps) {
    const db = await makeDb()
    const query: FilterQuery<PositionSchema> = {
      name: searchName,
      'belong.id': {
        $eq: belongId
      }
    }
    departmentIds.length > 0 && Object.assign<FilterQuery<PositionSchema>, FilterQuery<PositionSchema>>(query, {
      departmentId: { $in: departmentIds }
    })
    
    const result = await db.collection<PositionSchema>(colName).find(query).toArray()
    const total = result.length

    if (total <= 0) {
      return {
        list: [],
        total: 0
      }
    }

    const list = result.map(position => {
      const { _id: id, ...otherInfo } = position
      return {
        id,
        ...otherInfo
      }
    })
    return {
      list,
      total
    }
  }
}