const makeUsersDb = require('./users-db')
const buildMakeDb = require('../../db/mongo-db')

const dbUrl = 'mongodb://localhost:27017',
      dbName = 'react-cms',
      colName = 'users'

const makeDb = buildMakeDb({
  dbUrl,
  dbName
})

const usersDb = makeUsersDb({ makeDb, colName })

module.exports = usersDb
