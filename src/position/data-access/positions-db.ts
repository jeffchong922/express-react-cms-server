import { FilterQuery } from "mongodb";
import Id from "../../helpers/id";
import { FindByNameProps, InsertProps, MakePositionsDbProps, PositionSchema } from "./types";

export default function makePositionsDb ({ makeDb, colName }: MakePositionsDbProps) {
  return Object.freeze({
    findByName,
    insert
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
      const { _id: id, ...departmentInfo } = result
      return {
        id,
        ...departmentInfo
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
}