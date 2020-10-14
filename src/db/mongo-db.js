const { MongoClient } = require('mongodb')
const logger = require('../helpers/logger')

const clientStorage = new Map()

module.exports = function buildMakeDb ({ dbUrl, dbName }) {
  let client
  if (clientStorage.has(dbUrl)) {
    logger.info(`数据库地址: ${dbUrl} 存在，从缓存获取客户端`)
    client = clientStorage.get(dbUrl)
  } else {
    logger.info(`数据库地址: ${dbUrl} 不存在，创建新的客户端`)
    client = new MongoClient(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    clientStorage.set(dbUrl, client)
  }

  return async function makeDb () {
    if (!client.isConnected()) {
      logger.info(`等待数据库连接，地址: ${dbUrl}`)
      await client.connect()
    }
    return client.db(dbName)
  }
}