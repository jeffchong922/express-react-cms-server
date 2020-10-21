import { Db } from "mongodb"
import { MakeUserProps } from "../user"
import Id from "../../helpers/id"

interface UsersSchema {
  _id: string
  salt: string
  username: string
  password: string
}

interface MakeUsersDbProps {
  makeDb: () => Promise<Db>
  colName: string
}

interface insertProps extends MakeUserProps {
  salt: string
}

interface FindByNameProps {
  username: string
}

function makeUsersDb ({ makeDb, colName }: MakeUsersDbProps) {
  return Object.freeze({
    insert,
    findByName
  })

  async function insert ({ id: _id = Id.makeId(), ...userInfo }: insertProps) {
    const db = await makeDb()
    const result = await db.collection<UsersSchema>(colName).insertOne({
      _id,
      ...userInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function findByName ({ username }: FindByNameProps) {
    const db = await makeDb()
    const result = await db.collection<UsersSchema>(colName).findOne({ username })
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

export default makeUsersDb