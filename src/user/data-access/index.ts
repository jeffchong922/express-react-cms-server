import makeUsersDb from './users-db'
import buildMakeDb from '../../db/mongo-db'

const dbUrl = 'mongodb://localhost:27017',
      dbName = 'react-cms',
      colName = 'users'

const makeDb = buildMakeDb({
  dbUrl,
  dbName
})

const usersDb = makeUsersDb({ makeDb, colName })

export type UsersDbType = typeof usersDb

export default usersDb
