const makeDepartmentDb = require('./departments-db')
const buildMakeDb = require('../../db/mongo-db')

const dbUrl = 'mongodb://localhost:27017',
      dbName = 'react-cms',
      colName = 'department'

const makeDb = buildMakeDb({
  dbUrl,
  dbName
})

const departmentDb = makeDepartmentDb({ makeDb, colName })

module.exports = departmentDb
