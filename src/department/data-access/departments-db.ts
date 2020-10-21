import { Db, FilterQuery } from "mongodb"
import Id from "../../helpers/id"

interface BaseInfo {
  name: string
  status: boolean
  memberCount: number
  introduction: string
  belong: {
    id: string
    username: string
  }
}

type DepartmentsSchema = {
  _id: string
} & BaseInfo

interface MakeDepartmentsDbProps {
  makeDb: () => Promise<Db>
  colName: string
}

type InsertProps = {
  id?: string
} & BaseInfo

interface RemoveProps {
  id: string
}

interface RemoveManyProps {
  idList: Array<string>
}

type UpdateProps = {
  id: string
} & {
  [prop in keyof BaseInfo]?: BaseInfo[prop]
}

interface FindAllProps {
  belongId: string
  pageNumber: number
  pageSize: number
  searchNameReg: RegExp
}

interface FindAllWithoutPageProps {
  belongId: string
}

interface FindByIdProps {
  id: string
}

interface FindByNameProps {
  name: string
  belongId: string
}

export default function makeDepartmentsDb ({ makeDb, colName }: MakeDepartmentsDbProps) {
  return Object.freeze({
    insert,
    remove,
    update,
    findAll,
    findById,
    findByName,
    removeMany,
    findAllWithoutPage
  })

  async function insert ({ id: _id = Id.makeId(), ...departmentInfo }: InsertProps) {
    const db = await makeDb()
    const result = await db.collection<DepartmentsSchema>(colName).insertOne({
      _id,
      ...departmentInfo
    })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return {
      id,
      ...insertedInfo
    }
  }

  async function remove ({ id: _id }: RemoveProps) {
    const db = await makeDb()
    const result = await db.collection<DepartmentsSchema>(colName).deleteOne({ _id })
    return result
  }

  async function removeMany ({ idList }: RemoveManyProps) {
    const db = await makeDb()
    const result = await db.collection<DepartmentsSchema>(colName).deleteMany({
      _id: { $in: idList }
    })
    return result
  }

  async function update ({ id: _id, ...departmentInfo }: UpdateProps) {
    const db = await makeDb()
    const result = await db.collection<DepartmentsSchema>(colName).updateOne(
      { _id },
      { $set: { ...departmentInfo } }
    )
    return result
  }

  async function findAll ({ belongId, pageNumber, pageSize, searchNameReg }: FindAllProps) {
    const db = await makeDb()
    const query: FilterQuery<DepartmentsSchema> = {
      'name': searchNameReg,
      'belong.id': {
        $eq: belongId
      }
    }
    const result = await db.collection<DepartmentsSchema>(colName).find(query).toArray()
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

  async function findAllWithoutPage ({ belongId }: FindAllWithoutPageProps) {
    const db = await makeDb()
    const query: FilterQuery<DepartmentsSchema> = {
      'belong.id': {
        $eq: belongId
      }
    }
    const result = await db.collection<DepartmentsSchema>(colName).find(query).toArray()
    const total = result.length

    if (total <= 0) {
      return {
        list: [],
        total: 0
      }
    }

    // 数据处理
    const list = result.map(department => {
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

  async function findById ({ id: _id }: FindByIdProps) {
    const db = await makeDb()
    const result = await db.collection<DepartmentsSchema>(colName).findOne({ _id })
    if (result) {
      const { _id: id, ...departmentInfo } = result
      return {
        id,
        ...departmentInfo
      }
    }
    return null
  }

  async function findByName ({ name, belongId }: FindByNameProps) {
    const db = await makeDb()
    const query = {
      name,
      'belong.id': {
        $eq: belongId
      }
    }
    const result = await db.collection<DepartmentsSchema>(colName).findOne(query)
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