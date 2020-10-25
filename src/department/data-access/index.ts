import buildMakeDb from "../../db/mongo-db"
import makeDepartmentsDb from './departments-db'
import { DEPARTMENTS_DB_COL_NAME, DEPARTMENTS_DB_NAME, DEPARTMENTS_DB_URL } from "../../data/secrets"

const makeDb = buildMakeDb({
  dbUrl: DEPARTMENTS_DB_URL,
  dbName: DEPARTMENTS_DB_NAME
})

const departmentsDb = makeDepartmentsDb({ makeDb, colName: DEPARTMENTS_DB_COL_NAME })

export type DepartmentsDb = typeof departmentsDb

export default departmentsDb
