import buildMakeDb from "../../db/mongo-db"
import makeDepartmentsDb from './departments-db'

const dbUrl = 'mongodb://localhost:27017',
      dbName = 'react-cms',
      colName = 'department'

const makeDb = buildMakeDb({
  dbUrl,
  dbName
})

const departmentsDb = makeDepartmentsDb({ makeDb, colName })

export type DepartmentsDbType = typeof departmentsDb

export default departmentsDb
