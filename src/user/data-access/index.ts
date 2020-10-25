import makeUsersDb from './users-db'
import buildMakeDb from '../../db/mongo-db'
import { USERS_DB_URL, USERS_DB_NAME, USERS_DB_COL_NAME } from '../../data/secrets'

const makeDb = buildMakeDb({
  dbUrl: USERS_DB_URL,
  dbName: USERS_DB_NAME
})

const usersDb = makeUsersDb({ makeDb, colName: USERS_DB_COL_NAME })

export type UsersDbType = typeof usersDb

export default usersDb
